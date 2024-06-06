const alertWithLink = (message) => {
    alert(`${message} Invalid, please buy from Instagram.`);
    setTimeout(() => {
      window.location.href = 'https://www.instagram.com/';
    }, 5000);
  };
  