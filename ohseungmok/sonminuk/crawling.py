import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from urllib.parse import urljoin  # 추가된 import

def extract_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    news_items = soup.select('#section-list > ul > li')

    data_list = []

    for item in news_items:
        img_tag = item.select_one('a > img')
        if img_tag:
            img_href = img_tag['src'] if img_tag['src'] else "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf9GJkiugTOfjE35lMSWCzXHwHqQnbuttA0A&usqp=CAU"

            title_tag = item.select_one('h4 > a')
            title = title_tag.text if (title_tag and title_tag.text) else "null"
            title_href = title_tag['href'] if (title_tag and 'href' in title_tag.attrs) else "null"
            
            # 절대 URL로 변환
            content_url = urljoin(url, title_href)
            content_response = requests.get(content_url)
            content_soup = BeautifulSoup(content_response.text, 'html.parser')
            content_div = content_soup.select("#article-view-content-div p")
            content_text = " ".join([div.get_text().strip() for div in content_div])

            date_tag = item.select_one('span > em:nth-child(3)')
            date = date_tag.text if (date_tag and date_tag.text) else "null"
        else:
            img_href = "https://c.pxhere.com/images/ac/56/e1e0cfe9754e32298ac484c7a633-1628912.jpg!d"
            title_tag = item.select_one('h4 > a')
            title = title_tag.text if (title_tag and title_tag.text) else "null"
            title_href = title_tag['href'] if (title_tag and 'href' in title_tag.attrs) else "null"
            
            # 절대 URL로 변환
            content_url = urljoin(url, title_href)
            content_response = requests.get(content_url)
            content_soup = BeautifulSoup(content_response.text, 'html.parser')
            content_div = content_soup.select("#article-view-content-div p")
            content_text = " ".join([div.get_text().strip() for div in content_div])

            date_tag = item.select_one('span > em:nth-child(3)')
            date = date_tag.text if (date_tag and date_tag.text) else "null"

        data = {
                'img_href': img_href,
                'title': title,
                'title_href': title_href,
                'content': content_text,
                'date': date
        }

        data_list.append(data)

    return data_list

def save_data_to_firebase(data_list):
    firebase_ref = db.reference('news')
    for data in data_list:
        firebase_ref.push(data)

if __name__ == "__main__":
    cred_path="C:\pythonf\my-eco-prj-firebase-adminsdk-vawnb-8b2281c2b0.json"
    cred=credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://my-eco-prj-default-rtdb.firebaseio.com/'
    })

    base_url="https://www.hkbs.co.kr/news/articleList.html?sc_section_code=S1N1&view_type=sm&page="

    for page_num in range(1, 11):
        main_url=base_url+str(page_num)
        extracted_data=extract_data(main_url)
        save_data_to_firebase(extracted_data)
