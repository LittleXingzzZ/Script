console.log('----------美团订单信息查询助手----------');
console.log('Version: 1.0.0');
console.log('By: LittleXing');
console.log('--------------正在查询中...------------');

let nextPageBtn = document.querySelector('.pagination-wrapper_18YCzg button:last-child');
const intervalId = setInterval(() => {
  if (nextPageBtn && !nextPageBtn.disabled) {
    nextPageBtn.click();
    const orderCards = document.querySelectorAll('.order-card_1QJQho');
    orderCards.forEach(orderCard => {
      const userLabel = orderCard.querySelector('.user-label_3ZFXBo');
      if (userLabel && userLabel.textContent === '#门店新客') {
        const userName = orderCard.querySelector('.user-name_3XB8J3').textContent;
        const phoneAddressDiv = orderCard.querySelector('.user-phone-address_2U0Qzf');
        const phoneSpans = phoneAddressDiv.querySelectorAll('span');
        let phoneNum = '';
        let backupPhoneNum = '';
        phoneSpans.forEach(span => {
          if (span.textContent.includes('隐私号码')) {
            phoneNum = span.nextElementSibling.textContent;
          } else if (span.textContent.includes('备用号码')) {
            backupPhoneNum = span.nextElementSibling.textContent;
          }
        });
        const orderSeqNumber = orderCard.querySelector('.order-seq-number_faT1OM').textContent;
        const orderBasicInfo = orderCard.querySelector('.order-basic-info_1Wmf1g');
        const orderTime = orderBasicInfo.querySelector('span:first-child').textContent;
        const orderNumber = orderBasicInfo.querySelector('span:last-child').textContent.split('：')[1];
        console.log(`用户姓名：${userName}，电话号码：${phoneNum}，备用号码：${backupPhoneNum}，订单号：${orderSeqNumber}，下单时间：${orderTime}，订单编号：${orderNumber}`);
      }
    });
    nextPageBtn = document.querySelector('.pagination-wrapper_18YCzg button:last-child');
  } else {
    clearInterval(intervalId);
    console.log('----------查询完成！By: LittleXing----------');
  }
}, 1000);
