"""
Dark Web Data Leak Detection System
This module provides functionality to scan and detect potential data leaks
from simulated dark web datasets.
"""

import csv
import json
import re
from typing import List, Dict, Any
from datetime import datetime


class LeakDetector:
    """Main class for detecting and analyzing data leaks."""
    
    # Keyword patterns and their risk weights
    RISK_PATTERNS = {
        'password': {'weight': 30, 'pattern': r'\b(password|passwd|pwd)s?\b'},
        'credit_card': {'weight': 50, 'pattern': r'\b(credit\s*card|cc|visa|mastercard|amex)s?\b'},
        'ssn': {'weight': 50, 'pattern': r'\b(ssn|social\s*security)\b'},
        'email': {'weight': 20, 'pattern': r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'},
        'company_email': {'weight': 40, 'pattern': r'\b[A-Za-z0-9._%+-]+@company\.com\b'},
        'api_key': {'weight': 45, 'pattern': r'\b(api[_\s-]?keys?|access[_\s-]?tokens?)\b'},
        'database': {'weight': 35, 'pattern': r'\b(database|db|mysql|postgres|mongodb)s?\b'},
        'credentials': {'weight': 35, 'pattern': r'\b(credentials?|login|auth)\b'},
    }
    
    # Risk level thresholds
    RISK_THRESHOLDS = {
        'low': (0, 40),
        'moderate': (40, 75),
        'high': (75, 100)
    }
    
    def __init__(self):
        """Initialize the leak detector."""
        self.leaks = []
        self.scan_results = []
    
    def load_csv(self, filepath: str) -> List[Dict[str, Any]]:
        """
        Load data from a CSV file.
        
        Args:
            filepath: Path to the CSV file
            
        Returns:
            List of dictionaries containing the data
        """
        data = []
        try:
            with open(filepath, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    data.append(row)
            self.leaks = data
            return data
        except FileNotFoundError:
            raise FileNotFoundError(f"File not found: {filepath}")
        except Exception as e:
            raise Exception(f"Error loading CSV: {str(e)}")
    
    def load_json(self, filepath: str) -> List[Dict[str, Any]]:
        """
        Load data from a JSON file.
        
        Args:
            filepath: Path to the JSON file
            
        Returns:
            List of dictionaries containing the data
        """
        try:
            with open(filepath, 'r', encoding='utf-8') as file:
                data = json.load(file)
            self.leaks = data if isinstance(data, list) else [data]
            return self.leaks
        except FileNotFoundError:
            raise FileNotFoundError(f"File not found: {filepath}")
        except json.JSONDecodeError as e:
            raise Exception(f"Invalid JSON format: {str(e)}")
        except Exception as e:
            raise Exception(f"Error loading JSON: {str(e)}")
    
    def scan_entry(self, entry: Dict[str, Any]) -> Dict[str, Any]:
        """
        Scan a single entry for potential data leaks.
        
        Args:
            entry: Dictionary containing the entry data
            
        Returns:
            Dictionary with scan results including risk score and level
        """
        risk_score = 0
        detected_patterns = []
        
        # Convert all values to string for scanning
        entry_text = ' '.join(str(value).lower() for value in entry.values())
        
        # Check each pattern
        for pattern_name, pattern_info in self.RISK_PATTERNS.items():
            if re.search(pattern_info['pattern'], entry_text, re.IGNORECASE):
                risk_score += pattern_info['weight']
                detected_patterns.append(pattern_name)
        
        # Cap risk score at 100
        risk_score = min(risk_score, 100)
        
        # Determine risk level
        risk_level = self._calculate_risk_level(risk_score)
        
        return {
            'entry': entry,
            'risk_score': risk_score,
            'risk_level': risk_level,
            'detected_patterns': detected_patterns,
            'timestamp': datetime.now().isoformat()
        }
    
    def _calculate_risk_level(self, score: int) -> str:
        """
        Calculate risk level based on score.
        
        Args:
            score: Risk score (0-100)
            
        Returns:
            Risk level string: 'low', 'moderate', or 'high'
        """
        for level, (min_score, max_score) in self.RISK_THRESHOLDS.items():
            if min_score <= score < max_score:
                return level
        return 'high'  # Default to high if score >= 75
    
    def scan_all(self) -> List[Dict[str, Any]]:
        """
        Scan all loaded entries for potential data leaks.
        
        Returns:
            List of scan results
        """
        if not self.leaks:
            raise ValueError("No data loaded. Please load data first.")
        
        self.scan_results = []
        for entry in self.leaks:
            result = self.scan_entry(entry)
            self.scan_results.append(result)
        
        return self.scan_results
    
    def generate_summary(self) -> Dict[str, Any]:
        """
        Generate a summary of the scan results.
        
        Returns:
            Dictionary containing summary statistics
        """
        if not self.scan_results:
            raise ValueError("No scan results available. Please run scan_all() first.")
        
        total_entries = len(self.scan_results)
        risk_distribution = {'low': 0, 'moderate': 0, 'high': 0}
        total_risk_score = 0
        pattern_frequency = {}
        
        for result in self.scan_results:
            risk_level = result['risk_level']
            risk_distribution[risk_level] += 1
            total_risk_score += result['risk_score']
            
            for pattern in result['detected_patterns']:
                pattern_frequency[pattern] = pattern_frequency.get(pattern, 0) + 1
        
        avg_risk_score = total_risk_score / total_entries if total_entries > 0 else 0
        
        return {
            'total_entries': total_entries,
            'risk_distribution': risk_distribution,
            'average_risk_score': round(avg_risk_score, 2),
            'pattern_frequency': pattern_frequency,
            'high_risk_count': risk_distribution['high'],
            'moderate_risk_count': risk_distribution['moderate'],
            'low_risk_count': risk_distribution['low'],
            'scan_timestamp': datetime.now().isoformat()
        }
    
    def get_high_risk_entries(self) -> List[Dict[str, Any]]:
        """
        Get all high-risk entries from scan results.
        
        Returns:
            List of high-risk entries
        """
        if not self.scan_results:
            raise ValueError("No scan results available. Please run scan_all() first.")
        
        return [result for result in self.scan_results if result['risk_level'] == 'high']
    
    def export_results(self, filepath: str, format: str = 'json') -> None:
        """
        Export scan results to a file.
        
        Args:
            filepath: Path to save the results
            format: Output format ('json' or 'csv')
        """
        if not self.scan_results:
            raise ValueError("No scan results available. Please run scan_all() first.")
        
        if format == 'json':
            with open(filepath, 'w', encoding='utf-8') as file:
                json.dump(self.scan_results, file, indent=2)
        elif format == 'csv':
            with open(filepath, 'w', encoding='utf-8', newline='') as file:
                if self.scan_results:
                    fieldnames = ['risk_score', 'risk_level', 'detected_patterns', 'timestamp']
                    # Add entry fields
                    if 'entry' in self.scan_results[0]:
                        fieldnames.extend(self.scan_results[0]['entry'].keys())
                    
                    writer = csv.DictWriter(file, fieldnames=fieldnames)
                    writer.writeheader()
                    
                    for result in self.scan_results:
                        row = {
                            'risk_score': result['risk_score'],
                            'risk_level': result['risk_level'],
                            'detected_patterns': ', '.join(result['detected_patterns']),
                            'timestamp': result['timestamp']
                        }
                        row.update(result['entry'])
                        writer.writerow(row)
        else:
            raise ValueError(f"Unsupported format: {format}. Use 'json' or 'csv'.")


def main():
    """Example usage of the LeakDetector."""
    # Create detector instance
    detector = LeakDetector()
    
    # Load data (example with CSV)
    try:
        detector.load_csv('sample_data.csv')
        print("Data loaded successfully!")
        print(f"Loaded {len(detector.leaks)} entries")
        
        # Scan all entries
        print("\nScanning entries for potential leaks...")
        detector.scan_all()
        
        # Generate and print summary
        summary = detector.generate_summary()
        print("\n=== Scan Summary ===")
        print(f"Total entries scanned: {summary['total_entries']}")
        print(f"Average risk score: {summary['average_risk_score']}")
        print(f"\nRisk Distribution:")
        print(f"  High: {summary['high_risk_count']}")
        print(f"  Moderate: {summary['moderate_risk_count']}")
        print(f"  Low: {summary['low_risk_count']}")
        print(f"\nMost common patterns:")
        for pattern, count in sorted(summary['pattern_frequency'].items(), 
                                     key=lambda x: x[1], reverse=True):
            print(f"  {pattern}: {count}")
        
        # Show high-risk entries
        high_risk = detector.get_high_risk_entries()
        if high_risk:
            print(f"\n=== High Risk Entries ({len(high_risk)}) ===")
            for i, result in enumerate(high_risk[:5], 1):  # Show first 5
                print(f"\n{i}. Entry ID: {result['entry'].get('id', 'N/A')}")
                print(f"   Risk Score: {result['risk_score']}")
                print(f"   Detected Patterns: {', '.join(result['detected_patterns'])}")
        
        # Export results
        detector.export_results('scan_results.json', format='json')
        print("\n✓ Results exported to scan_results.json")
        
    except FileNotFoundError:
        print("Error: sample_data.csv not found. Please create the sample dataset first.")
    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == '__main__':
    main()
