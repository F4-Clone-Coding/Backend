const { Store } = require('../db/models');
const schedule = require('node-schedule');

module.exports = {
  resetview: async () => {
    try {
      console.log('초기화코드 1시간뒤 동작');
      // 1시간 마다 이메일 스케쥴 실행 "*/! * * * *" //1분마다 실행
      schedule.scheduleJob({ hour: 12 }, async () => {
        await Store.update({ viewRecent: 0 }, { where: {} });
      });
    } catch (err) {
      console.log(err);
    }
  },
  // await Store.update({ viewRecent: 0 }, { where: {} });
};
