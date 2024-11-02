export const CABLE_PRESETS = {
  standard: {
    name: "Standard Copper",
    description: "Standard CAT6/6A copper cable settings with typical service loop and dressing allowances",
    settings: {
      verticalRun: 22,
      dressingAllowance: 11,
      slackAllowance: 10,
      aisleEntryLength: 6,
      middleTrayOverhead: 12,
      endTrayOverhead: 12,
      visualization: {
        enhanced: true,
        showArrows: true,
        showDistances: true,
        showGlow: true
      }
    }
  },
  fiber: {
    name: "Fiber Optic",
    description: "Fiber optic cable settings with extra slack for service loops and careful bend radius management",
    settings: {
      verticalRun: 24,
      dressingAllowance: 15,
      slackAllowance: 15,
      aisleEntryLength: 8,
      middleTrayOverhead: 12,
      endTrayOverhead: 12,
      visualization: {
        enhanced: true,
        showArrows: true,
        showDistances: true,
        showGlow: true
      }
    }
  },
  minimal: {
    name: "Minimal Path",
    description: "Minimal allowances for short runs or tight spaces. Use with caution for maintenance access",
    settings: {
      verticalRun: 20,
      dressingAllowance: 8,
      slackAllowance: 8,
      aisleEntryLength: 4,
      middleTrayOverhead: 10,
      endTrayOverhead: 10,
      visualization: {
        enhanced: false,
        showArrows: false,
        showDistances: true,
        showGlow: false
      }
    }
  }
}; 