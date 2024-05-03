import occasionsJSON from '@/mocks/occasions.json';
import emotionsJSON from '@/mocks/emotions.json';
import dayjs from 'dayjs';

const shortNote = 'Lorem ipsum dolor sit amet';
const longNote = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getDate() {
  return dayjs().subtract(getRandomInt(30), 'day');
}

function getOccasionsAndEmotions(json) {
  const ids = json.map(({ id }) => id);
  const entities = new Set();

  for (let i = 0; i < getRandomInt(10); i += 1) {
    entities.add(ids[getRandomInt(ids.length - 1)]);
  }

  return [...entities];
}

function generateNote() {
  return [null, shortNote, longNote][getRandomInt(3)];
}

function generateCondition() {
  return {
    id: crypto.randomUUID(),
    date: getDate(),
    mood: getRandomInt(7),
    energy: getRandomInt(7),
    occasions: getOccasionsAndEmotions(occasionsJSON),
    emotions: getOccasionsAndEmotions(emotionsJSON),
    note: generateNote(),
  };
}

const mockConditions = [];

for (let i = 0; i < 20; i += 1) {
  mockConditions.push(generateCondition());
}

export default mockConditions;
