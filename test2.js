const { MenuCategory, Category, Store, Menu } = require('./db/models');
const mc = [
  '기타',
  '찌개&탕',
  '덮밥&볶음밥',
  '면류',
  '밥류',
  '볶음류',
  '튀김류',
  '스시',
  '초밥',
  '돈까스',
  '카레',
  '파스타',
  '피자',
  '스테이크',
  '햄버거',
  '치킨',
  '샐러드',
  '커피',
  '음료',
  '티',
  '디저트',
  '메인메뉴',
  '사이드메뉴',
];

for (i of mc) {
  MenuCategory.create({ name: i });
}
