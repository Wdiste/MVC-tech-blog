module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  current_user: (currentUser, targetUser) => {
    if(currentUser === targetUser) {
      return true;
    } else {
      return false;
    };
  }
};
