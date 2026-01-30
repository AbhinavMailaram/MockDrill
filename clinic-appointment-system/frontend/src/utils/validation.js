export const validation = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone number validation (basic)
  isValidPhone: (phone) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone.replace(/[-\s()]/g, ''));
  },

  // Password strength validation
  isStrongPassword: (password) => {
    return password.length >= 6;
  },

  // Username validation
  isValidUsername: (username) => {
    return username.length >= 3 && username.length <= 50;
  },

  // Required field validation
  isRequired: (value) => {
    return value !== null && value !== undefined && value.trim() !== '';
  },

  // Date validation (future date)
  isFutureDate: (date) => {
    return new Date(date) > new Date();
  },

  // Format date for display
  formatDate: (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Format date for input
  formatDateForInput: (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  },
};
