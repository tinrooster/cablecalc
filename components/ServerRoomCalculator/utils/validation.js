export const validateRackSelection = (sourceRack, targetRack) => {
  const errors = [];

  if (!sourceRack || !targetRack) {
    errors.push('Both source and target racks must be selected');
    return errors;
  }

  if (sourceRack === targetRack) {
    errors.push('Source and target racks cannot be the same');
  }

  // Validate rack format (e.g., "TD15", "TK04")
  const rackFormat = /^[A-Z]{2}\d{2}$/;
  if (!rackFormat.test(sourceRack)) {
    errors.push(`Invalid source rack format: ${sourceRack}`);
  }
  if (!rackFormat.test(targetRack)) {
    errors.push(`Invalid target rack format: ${targetRack}`);
  }

  // Validate rack exists in room configuration
  if (!isValidRack(sourceRack)) {
    errors.push(`Source rack ${sourceRack} does not exist`);
  }
  if (!isValidRack(targetRack)) {
    errors.push(`Target rack ${targetRack} does not exist`);
  }

  return errors;
};

const isValidRack = (rackId) => {
  // Check special racks first
  const specialRacks = ['TD14', 'TD15', 'CL01'];
  if (specialRacks.includes(rackId)) return true;

  // Parse rack ID
  const row = rackId.slice(0, 2);
  const number = parseInt(rackId.slice(2));

  // Validate against room configuration
  const rowConfig = ROOMS.main.rows.find(r => r.id === row);
  if (!rowConfig) return false;

  // Check if rack number is within valid range
  if (rowConfig.reverse) {
    return number <= rowConfig.start && number > (rowConfig.start - rowConfig.count);
  } else {
    return number >= rowConfig.start && number < (rowConfig.start + rowConfig.count);
  }
}; 