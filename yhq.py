import requests
from bs4 import BeautifulSoup
import time

url = 'https://www.parsdata.com/en-US/Default.aspx?ajax=1&sys=data&out=FDAjax'
response = requests.get(url)
html = response.text
soup = BeautifulSoup(html, 'html.parser')
last_coupon = soup.find('div', {'class': 'fdCode'}).text.strip()


while True:
    url = 'https://www.parsdata.com/en-US/Default.aspx?ajax=1&sys=data&out=FDAjax'
    response = requests.get(url)
    html = response.text

    # 解析 HTML
    soup = BeautifulSoup(html, 'html.parser')
    coupon_info = soup.find('div', {'class': 'fdCode'}).text.strip()

    if coupon_info != last_coupon:
        # 发送通知
        notify_url = 'http://192.168.2.2:5700/api/sendNotify'  # 替换成你的青龙面板通知接口地址
        data = {
            'title': '优惠券变更',
            'content': f'优惠券信息已变更，新的优惠券为：{coupon_info}'
        }
        requests.post(notify_url, data=data)

        # 更新上一次的优惠券
        last_coupon = coupon_info

    # 等待1分钟后再次检测
    time.sleep(60)
