/**
 * 
 * 랜덤 좌표 생성
 * lat 37.4132940 ~ 37.7151330, long 126.7340860 ~ 127.2693110
 * 0~3018390 + 371114550,  0~5352250 + 1261988610
 * 
 * 두 좌표간 거리
 * 위도35 >> 위도1 = 110.941km, 경도1 = 91.290km
 * 위도40 >> 위도1 = 111.034km, 경도1 = 85.397km
 * 대충 110 / 88
 * 
 */

class Coords {
    #baseLatitude = 371114550;
    #baseLongitude = 1261988610;

    #maxLatitude = 3018390;
    #maxLongitude = 5352250;


    randomSeoulCoord = function() {
        const latitude = Math.random()*this.#maxLatitude + this.#baseLatitude;
        const longitude = Math.random()*this.#maxLongitude + this.#baseLongitude;

        return `${latitude|0}, ${longitude|0}`;
    }

    coordDistance = function(A, B) {
        const [ latitudeA, longitudeA ] = A.split(', ').map(Number);
        const [ latitudeB, longitudeB ] = B.split(', ').map(Number);

        const latitudeDifference = Math.abs(latitudeA - latitudeB);
        const longitudeDifference = Math.abs(longitudeA - longitudeB);

        const latitudeDistance = (110 * latitudeDifference) / 10000;
        const longitudeDistance = (88 * longitudeDifference) / 10000;

        const distance = Math.sqrt(latitudeDistance**2 + longitudeDistance**2);
        return distance|0;
    }
}

// distance by meter
// 좀 범위가 크게 나오는데, 경우에 따라 지역 범위를 좁히는 것도 고려

module.exports = new Coords();