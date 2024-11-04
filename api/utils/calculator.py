from typing import Dict, Tuple
import math

class CableCalculator:
    RACK_POSITIONS = {
        'TD': {'row': 0, 'positions': range(1, 16)},
        'TX': {'row': 1, 'positions': range(6, 18)},
        'TC': {'row': 2, 'positions': range(1, 14)},
        'TD': {'row': 3, 'positions': range(1, 14)},
        'TE': {'row': 4, 'positions': range(1, 14)},
        'TF': {'row': 5, 'positions': range(1, 13)},
        'TG': {'row': 6, 'positions': range(1, 13)},
        'TH': {'row': 7, 'positions': range(1, 12)},
        'TJ': {'row': 8, 'positions': range(1, 11)},
        'TK': {'row': 9, 'positions': range(1, 11)},
    }

    RACK_WIDTH = 2  # feet
    RACK_DEPTH = 3  # feet

    @staticmethod
    def parse_position(position: str) -> Tuple[str, int]:
        """Parse rack position string (e.g., 'TC-12' -> ('TC', 12))"""
        row, pos = position.split('-')
        return row, int(pos)

    @staticmethod
    def is_middle_cross_tray(row: str, pos: int) -> bool:
        """Check if position is in middle cross tray zone"""
        return (row == 'TH' and pos >= 8) or (row == 'TC' and pos <= 11)

    @staticmethod
    def is_end_cross_tray(row: str, pos: int) -> bool:
        """Check if position is in end cross tray zone"""
        return (row == 'TK' and pos <= 1) or (row == 'TC' and pos <= 4)

    def calculate_distance(
        self,
        source: str,
        target: str,
        route_type: str,
        settings: Dict
    ) -> Dict:
        """Calculate cable path and length"""
        source_row, source_pos = self.parse_position(source)
        target_row, target_pos = self.parse_position(target)

        # Calculate horizontal distance
        horizontal_distance = abs(source_pos - target_pos) * self.RACK_WIDTH

        # Calculate vertical components based on route type
        if route_type == 'default':
            # Default aisle route
            vertical_distance = settings['vertical_run'] * 2  # Up and down
            route_path = 'Aisle Route (Default)'
            cross_tray_height = 0
        else:
            # Cross tray route
            if self.is_middle_cross_tray(source_row, source_pos) or \
               self.is_middle_cross_tray(target_row, target_pos):
                cross_tray_height = 0
            elif self.is_end_cross_tray(source_row, source_pos) or \
                 self.is_end_cross_tray(target_row, target_pos):
                cross_tray_height = 0
            else:
                cross_tray_height = 0

        # Calculate total cable length
        cable_length = horizontal_distance + vertical_distance + cross_tray_height

        return {
            'route_path': route_path,
            'cable_length': cable_length
        } 