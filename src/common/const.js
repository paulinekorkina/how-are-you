const MoodClass = {
  0: 'awful',
  1: 'bad',
  2: 'meh',
  3: 'normal',
  4: 'good',
  5: 'excellent',
  6: 'wonderful',
};

const MoodName = {
  0: 'ужасное',
  1: 'плохое',
  2: 'не очень',
  3: 'нормальное',
  4: 'хорошее',
  5: 'отличное',
  6: 'превосходное',
};

const EnergyName = {
  0: 'полный ноль',
  1: 'очень мало энергии',
  2: 'мало энергии',
  3: 'энергия в норме',
  4: 'много энергии',
  5: 'очень много энергии',
  6: 'ядерный реактор',
};

const MAX_NOTE_LENGTH = 120;

const emojiPickerAttrs = {
  native: true,
  'display-recent': true,
  'static-texts': { placeholder: 'Поиск эмодзи', skinTone: 'Оттенок кожи' },
  'group-names': {
    recent: 'Недавно использованные',
    smileys_people: 'Смайлы и лица',
    animals_nature: 'Природа и животные',
    food_drink: 'Еда и напитки',
    activities: 'Деятельность',
    travel_places: 'Путешествия',
    objects: 'Объекты',
    symbols: 'Символы',
    flags: 'Флаги',
  },
};

export {
  MoodClass, MoodName, EnergyName, MAX_NOTE_LENGTH, emojiPickerAttrs,
};
