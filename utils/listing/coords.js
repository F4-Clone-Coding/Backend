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


/**
 * 대전 좌표
 * LAT: 3619647311 ~ 3646908467
 * LOT: 12724912510 ~ 12753344960
 * 
 * 
 * baseLAT = 3619647311
 * baseLOT = 12724912510
 * 
 * maxLAT = 27261156
 * maxLOT = 28432450
 */

class Coords {
    #baseLatitude = 371114550;
    #baseLongitude = 1261988610;

    #maxLatitude = 3018390;
    #maxLongitude = 5352250;

    #latConvertRatio = 375642135 / 363327789;
    #lotConvertRatio = 1270016985 / 1273912874;

    convertCoords = (X, Y) => {
        return [ 
            Number((X * this.#latConvertRatio).toFixed(7)) * 10**7,
            Number((Y * this.#lotConvertRatio).toFixed(7)) * 10**7 
        ]
    }
    
    coordDistance = ([X1, Y1], [X2, Y2]) => {
        const latitudeDifference = Math.abs(X1 - X2);
        const longitudeDifference = Math.abs(Y1 - Y2);
        
        const latitudeDistance = (110 * latitudeDifference) / 10000;
        const longitudeDistance = (88 * longitudeDifference) / 10000;
        
        const distance = Math.sqrt(latitudeDistance**2 + longitudeDistance**2);
        return distance|0;
    }

    squareBox = (userX, userY) => {
        const n = 4;
        const [minX, maxX] = [ (userX - (n/110)*10**7)|0, (userX + n/110*10**7)|0 ];
        const [minY, maxY] = [ (userY - n/88*10**7)|0, (userY + n/88*10**7)|0 ];

        return { minX, maxX, minY, maxY };
    }

    randomSeoulCoord = () => {
        const latitude = Math.random()*this.#maxLatitude + this.#baseLatitude;
        const longitude = Math.random()*this.#maxLongitude + this.#baseLongitude;

        return `${latitude|0}, ${longitude|0}`;
    }
}

// distance by meter
// 좀 범위가 크게 나오는데, 경우에 따라 지역 범위를 좁히는 것도 고려

module.exports = new Coords();