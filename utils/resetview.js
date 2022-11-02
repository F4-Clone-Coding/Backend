const { Store } = require('../db/models');
const schedule = require('node-schedule');

module.exports = {
  resetview: async () => {
    try {
      // 1시간 마다 이메일 스케쥴 실행 "*/! * * * *" //1분마다 실행
      //월요일 00시에 초기화
      schedule.scheduleJob({ hour: 0, dayOfWeek: 1 }, async () => {
        await Store.update({ viewRecent: 0 }, { where: {} });
      });
    } catch (err) {
      console.log(err);
    }
  },
};
