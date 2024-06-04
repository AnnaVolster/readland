import os
import sys

import django

# Настройка Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'readland.settings')
django.setup()

from store.models import Book

# Список книг
books = [
    {
        "title": "Ваш покорный слуга кот",
        "author": "Сосэки Нацумэ",
        "genre": "Литература классическая",
        "price": 233,
        "description": "«Ваш покорный слуга кот» – это ироничное произведение, написанное от лица кота, который наблюдает за людьми и их жизнью.",
        "stock": 10,
        "rating": 4.5,
        "publisher": "Издательство X",
        "series": "Серия Y",
        "publication_year": 2020,
        "isbn": "978-3-16-148410-0",
        "page_count": 320,
        "size": "21 x 14 x 2 cm",
        "cover_type": "Твердая",
        "circulation": 5000,
        "weight": 500,
        "age_restrictions": "16+"
    },
    {
        "title": "Портрет Дориана Грея",
        "author": "Оскар Уайльд",
        "genre": "Литература классическая",
        "price": 174,
        "description": "«Портрет Дориана Грея» – это роман о молодом человеке, чья внешность остается неизменной, несмотря на его греховные поступки.",
        "stock": 10,
        "rating": 4.0,
        "publisher": "Издательство Z",
        "series": None,
        "publication_year": 2019,
        "isbn": "978-1-86197-876-9",
        "page_count": 254,
        "size": "20 x 13 x 1.5 cm",
        "cover_type": "Мягкая",
        "circulation": 3000,
        "weight": 400,
        "age_restrictions": "18+"
    },
    {
        "title": "Мастер и Маргарита",
        "author": "Михаил Булгаков",
        "genre": "Литература классическая",
        "price": 219,
        "description": "«Мастер и Маргарита» – это культовый роман, который рассказывает о борьбе между добром и злом, любви и предательстве.",
        "stock": 10,
        "rating": 4.5,
        "publisher": "Издательство A",
        "series": "Серия B",
        "publication_year": 2018,
        "isbn": "978-5-699-12058-4",
        "page_count": 480,
        "size": "22 x 15 x 3 cm",
        "cover_type": "Твердая",
        "circulation": 10000,
        "weight": 600,
        "age_restrictions": "16+"
    },
    {
        "title": "Гордость и предубеждение",
        "author": "Джейн Остин",
        "genre": "Литература классическая",
        "price": 181,
        "description": "«Гордость и предубеждение» – это роман о жизни английского общества начала XIX века и истории любви Элизабет Беннет и мистера Дарси.",
        "stock": 10,
        "rating": 4.5,
        "publisher": "Издательство B",
        "series": "Серия C",
        "publication_year": 2021,
        "isbn": "978-0-14-143951-8",
        "page_count": 432,
        "size": "20 x 13 x 2.5 cm",
        "cover_type": "Твердая",
        "circulation": 7000,
        "weight": 450,
        "age_restrictions": "12+"
    },
    {
        "title": "Грозовой перевал",
        "author": "Эмили Бронте",
        "genre": "Литература классическая",
        "price": 180,
        "description": "«Грозовой перевал» – это единственный роман Эмили Бронте, рассказывающий о страстной и разрушительной любви.",
        "stock": 10,
        "rating": 4.5,
        "publisher": "Издательство D",
        "series": "Серия E",
        "publication_year": 2020,
        "isbn": "978-0-19-953560-6",
        "page_count": 416,
        "size": "19 x 12 x 2 cm",
        "cover_type": "Мягкая",
        "circulation": 8000,
        "weight": 400,
        "age_restrictions": "14+"
    },
    {
        "title": "Мартин Иден",
        "author": "Джек Лондон",
        "genre": "Литература классическая",
        "price": 212,
        "description": "«Мартин Иден» – это автобиографический роман Джека Лондона о борьбе молодого человека за признание и успех.",
        "stock": 10,
        "rating": 4.5,
        "publisher": "Издательство F",
        "series": "Серия G",
        "publication_year": 2022,
        "isbn": "978-0-14-018772-0",
        "page_count": 528,
        "size": "21 x 14 x 3 cm",
        "cover_type": "Твердая",
        "circulation": 6000,
        "weight": 550,
        "age_restrictions": "16+"
    },
    {
        "title": "1984",
        "author": "Джордж Оруэлл",
        "genre": "Антиутопия",
        "price": 200,
        "description": "«1984» – это антиутопический роман Джорджа Оруэлла, изображающий тоталитарное общество, контролируемое Большим Братом.",
        "stock": 10,
        "rating": 3.5,
        "publisher": "Издательство G",
        "series": "Серия H",
        "publication_year": 2019,
        "isbn": "978-0-452-28423-4",
        "page_count": 336,
        "size": "20 x 13 x 2 cm",
        "cover_type": "Мягкая",
        "circulation": 9000,
        "weight": 450,
        "age_restrictions": "18+"
    },
    {
        "title": "Маленькие женщины",
        "author": "Луиза Мэй Олкотт",
        "genre": "Литература классическая",
        "price": 233,
        "description": "«Маленькие женщины» – это роман о жизни четырех сестер, их взрослении, любви и семейных ценностях.",
        "stock": 10,
        "rating": 4.5,
        "publisher": "Издательство H",
        "series": "Серия I",
        "publication_year": 2021,
        "isbn": "978-0-316-76948-8",
        "page_count": 400,
        "size": "21 x 14 x 2.5 cm",
        "cover_type": "Твердая",
        "circulation": 4000,
        "weight": 500,
        "age_restrictions": "12+"
    }
]

# Добавление книг в базу данных
for book in books:
    Book.objects.create(**book)

print("Книги успешно добавлены в базу данных")
