<template>
<table :class="{ 'onlyDisplayAvailable': onlyDisplayAvailable }">
    <template v-for="(player, index) in playersByPosition(positionSelected)">
        <tr :class="{ 'unavailable': player.pickStatus !== 'a', 'userDrafted': player.pickStatus === 'u', 'lastInTier': isLastInTier(positionSelected, index) }" v-bind:key="player.id">
            <td class="ranking">{{ player.userRanking.overall }}</td>
            <td :class="{'movement': true, 'up': player.userRanking.overall < player.ranking.overall, 'down': player.userRanking.overall > player.ranking.overall }"
              v-bind:title="previousRankMessage(player.userRanking.overall, player.ranking.overall)">
                <span v-if="player.ranking.stdDev > 0" class="stdDev">σ{{ player.ranking.stdDev }}</span>
                {{ player.userRanking.overall < player.ranking.overall ? '↑' : '' }}
                {{ player.userRanking.overall > player.ranking.overall ? '↓' : '' }}
            </td>
            <td>{{ positionPlusRanking(player) }}</td>
            <td>{{ player.name }}</td>
            <td class="tags">
                <div class="tagIconParent" v-if="isDomeKicker(player.positionKey, player.nflTeam.name)" title="Dome">
                    <svg class="tagIcon dome" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 175.9"><path d="m247.7 175.9-239.3 0C3.8 175.9 0 168.4 0 159.2 0 115 13.9 74.2 39.1 44.1 63 15.7 94.6 0 128 0c33.5 0 65 15.7 88.9 44.1 25.2 30.1 39.1 70.9 39.1 115.1 0 9.2-3.7 16.7-8.3 16.7zM208.4 72.8C187 47.4 158.5 33.4 128 33.4 97.5 33.4 69 47.4 47.7 72.8 31.2 92.4 20.9 116.7 17.7 142.5l220.6 0C235.2 116.7 224.8 92.4 208.4 72.8Z"/></svg>
                </div>
                <div class="tagIconParent" v-if="isTarget(player.id)" title="Target">
                    <svg class="tagIcon target" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M388.4 123.6l3.8-42.2c0.4-4.1 2.2-8 5.1-10.9l52.9-52.9c3.4-3.4 9-3.4 12.5 0l31.7 31.7c3.4 3.4 3.4 9 0 12.5l-52.9 52.9c-2.9 2.9-6.8 4.7-10.9 5.1L388.4 123.6z" class="a"/><circle cx="211.9" cy="300.1" r="211.9" class="b"/><circle cx="211.9" cy="300.1" r="158.9" class="c"/><circle cx="211.9" cy="300.1" r="105.9" class="b"/><circle cx="211.9" cy="300.1" r="53" class="c"/><path d="M211.9 309c-2.3 0-4.5-0.9-6.2-2.6 -3.4-3.4-3.4-9 0-12.5l291.3-291.3c3.4-3.4 9-3.4 12.5 0 3.4 3.4 3.4 9 0 12.5l-291.3 291.3C216.4 308.1 214.1 309 211.9 309z" fill="#464655"/><path d="M509.4 2.6c-3.4-3.4-9-3.4-12.5 0l-15.1 15.1 12.5 12.5 15.1-15.1C512.9 11.6 512.9 6 509.4 2.6z" class="a"/></svg>
                </div>
                <div class="tagIconParent" v-if="isHandcuff(player.id)" title="Handcuff">
                  <svg class="tagIcon handcuff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 446 446"><path d="M150.5 217.5c2.5 0 4.6 2.1 4.6 4.6 0 2.5-2.1 4.6-4.6 4.6 -2.5 0-4.6-2-4.6-4.6C145.9 219.5 147.9 217.5 150.5 217.5z" class="a"/><path d="M222.1 145.9c2.5 0 4.6 2.1 4.6 4.6 0 2.5-2.1 4.6-4.6 4.6 -2.5 0-4.6-2-4.6-4.6C217.5 147.9 219.5 145.9 222.1 145.9z" class="a"/><path d="M111.1 413.5c5.3 0 9.7 4.3 9.7 9.6 0 5.3-4.3 9.6-9.6 9.6 -5.3 0-9.6-4.3-9.6-9.6C101.5 417.8 105.8 413.5 111.1 413.5z" class="b"/><path d="M423.1 101.5c5.3 0 9.7 4.3 9.7 9.6s-4.3 9.6-9.6 9.6c-5.3 0-9.6-4.3-9.6-9.6S417.8 101.5 423.1 101.5z" class="b"/><path d="M186.8 266.4c11.3 15.9 22.2 40.8 22.2 63.1 0 45.8-31.7 84.9-75.3 95.2 0-0.5 0.1-1 0.1-1.5 0-4.4-1.2-8.4-3.4-11.9 37.1-8.7 64.8-42.1 64.8-81.8 0-26.7-12.6-50.6-32.1-66 5.1 0.9 10.1 1.9 14.9 3.1 1.4 0.4 2.8 0.6 4.2 0.6C183.7 267.1 185.3 266.9 186.8 266.4z" class="b"/><path d="M423.1 133.8c0.5 0 1 0 1.6-0.1 -10.3 43.6-49.4 75.3-95.2 75.3 -22.2 0-47.1-11-63-22.2 0.5-1.5 0.7-3 0.7-4.6 0-1.4-0.2-2.8-0.6-4.2 -1.2-4.8-2.2-9.8-3.1-14.9 15.4 19.5 39.3 32.1 66 32.1 39.7 0 73.1-27.7 81.8-64.8C414.7 132.5 418.8 133.8 423.1 133.8z" class="b"/><path d="M184.1 251.8c0.1 0.6-0.1 1.2-0.5 1.6 -0.5 0.6-1.3 0.8-2.1 0.6 -0.1 0-0.2-0.1-0.3-0.1 -23.3-5.9-68-8.5-70.1-8.5 -46.3 0-84 37.7-84 84 0 39.7 27.7 73 64.8 81.8 -2.1 3.5-3.4 7.5-3.4 11.9 0 0.5 0 1.1 0.1 1.6 -19-4.4-36.3-14.5-49.6-28.9 -15.8-17.2-24.9-39.7-25.6-63.3 -0.6-21.2 5.4-41.5 17.4-58.8 0 0 0.1-0.1 0.1-0.1 1.7-2.4 3-4.9 4.1-7.5 1.1-2.7 1.9-5.4 2.3-8.2l8.2-52.5c1.3-8.2 8.3-14.2 16.6-14.2h98.1c8.3 0 15.3 6 16.6 14.2L184.1 251.8zM168 222.1c0-9.7-7.9-17.6-17.6-17.6 -9.7 0-17.6 7.9-17.6 17.6 0 9.7 7.9 17.6 17.6 17.6C160.1 239.6 168 231.8 168 222.1z" class="c"/><path d="M424.7 88.5c-0.5 0-1-0.1-1.6-0.1 -4.4 0-8.4 1.2-11.9 3.4 -8.7-37.1-42.1-64.8-81.8-64.8 -46.3 0-84 37.7-84 84 0 2.1 2.7 46.8 8.5 70.1 0 0.1 0.1 0.2 0.1 0.3 0.1 0.2 0.1 0.4 0.1 0.6 0 0.6-0.2 1.1-0.7 1.5 -0.4 0.4-1 0.6-1.6 0.5l-46.6-7.3c-8.2-1.3-14.2-8.3-14.2-16.6v-98.1c0-8.3 6-15.3 14.2-16.6l52.5-8.2c5.6-0.9 11.1-3.1 15.8-6.4 0 0 0.1-0.1 0.1-0.1 17.3-12 37.6-18 58.8-17.4 23.6 0.7 46.1 9.8 63.3 25.6C410.2 52.2 420.3 69.5 424.7 88.5zM239.6 150.5c0-9.7-7.9-17.6-17.6-17.6 -9.7 0-17.6 7.9-17.6 17.6 0 9.7 7.9 17.6 17.6 17.6C231.8 168 239.6 160.1 239.6 150.5z" class="c"/><path d="M439.2 95.1c4.1 4.1 6.6 9.8 6.6 16 0 6.2-2.5 11.9-6.6 16 -7.8 54.3-54.5 94.9-109.7 94.9 -26 0-54.2-12.5-72.2-25.8 -1.6 0.6-3.3 0.9-5.1 0.9 -0.8 0-1.6-0.1-2.3-0.2l-46.6-7.3c-14.6-2.3-25.2-14.7-25.2-29.4v-42.5h-4.6c-2.7 7.9-10.2 13.6-18.9 13.6s-16.2-5.7-18.9-13.5h-16.8c-0.6 0-1.2 0.5-1.2 1.2v16.8c7.9 2.7 13.6 10.2 13.6 19s-5.7 16.2-13.6 19v4.6h42.6c14.8 0 27.1 10.6 29.4 25.2l7.3 46.6c0.4 2.6 0.1 5.1-0.7 7.4 13.3 18 25.8 46.2 25.8 72.2 0 55.2-40.6 101.9-94.9 109.7 -4.1 4.1-9.7 6.6-16 6.6 -6.2 0-11.9-2.5-16-6.6 -25.3-3.6-48.5-15.8-65.8-34.6 -17.9-19.5-28.3-45-29-71.8 -0.7-24 6.2-47.1 19.8-66.7 0-0.1 0.1-0.1 0.1-0.2 2.1-3.1 3.6-6.6 4.1-10.2l8.2-52.5c2.3-14.6 14.7-25.2 29.4-25.2h42.6v-4.6c-7.9-2.7-13.5-10.2-13.5-18.9s5.7-16.2 13.6-18.9v-16.8c0-7.8 6.4-14.2 14.2-14.2h16.8c2.7-7.9 10.2-13.5 19-13.5s16.2 5.7 19 13.6h4.6v-42.5c0-14.8 10.6-27.1 25.2-29.4l52.5-8.2c3.6-0.6 7.1-2 10.2-4.1 0.1 0 0.1-0.1 0.2-0.1 19.6-13.7 42.7-20.5 66.7-19.8 26.7 0.8 52.2 11.1 71.8 29.1C423.3 46.6 435.5 69.9 439.2 95.1zM432.8 111.1c0-5.3-4.3-9.6-9.6-9.6 -5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6C428.4 120.8 432.8 116.4 432.8 111.1zM423.1 88.5c0.5 0 1.1 0 1.6 0.1 -4.4-19-14.5-36.3-28.9-49.6 -17.2-15.8-39.7-24.9-63.3-25.6 -21.2-0.6-41.5 5.4-58.8 17.4 0 0-0.1 0.1-0.1 0.1 -4.7 3.3-10.2 5.5-15.8 6.4l-52.5 8.2c-8.2 1.3-14.2 8.3-14.2 16.6v98.1c0 8.3 6 15.3 14.2 16.6l46.6 7.3c0.6 0.1 1.2-0.1 1.6-0.5 0.5-0.4 0.7-0.9 0.7-1.5 0-0.2 0-0.4-0.1-0.6 0-0.1-0.1-0.2-0.1-0.3 -5.9-23.3-8.5-67.9-8.5-70.1 0-46.3 37.7-84 84-84 39.7 0 73.1 27.7 81.8 64.8C414.7 89.7 418.8 88.5 423.1 88.5zM424.7 133.7c-0.5 0-1 0.1-1.5 0.1 -4.4 0-8.4-1.2-11.9-3.4 -8.7 37.1-42.1 64.8-81.8 64.8 -26.7 0-50.6-12.6-66-32.1 0.9 5.1 1.9 10.1 3.1 14.9 0.4 1.4 0.6 2.8 0.6 4.2 0 1.6-0.3 3.2-0.7 4.6 15.9 11.3 40.8 22.2 63.1 22.2C375.2 209 414.4 177.3 424.7 133.7zM400.5 111.1c0-39.2-31.9-71-71-71 -39.2 0-71 31.9-71 71 0 39.2 31.9 71 71 71C368.6 182.1 400.5 150.3 400.5 111.1zM209 329.5c0-22.2-11-47.1-22.2-63.1 -1.5 0.5-3 0.7-4.6 0.7 -1.4 0-2.8-0.2-4.2-0.6 -4.8-1.2-9.8-2.2-14.9-3.1 19.5 15.4 32.1 39.3 32.1 66 0 39.7-27.7 73-64.8 81.8 2.2 3.5 3.4 7.5 3.4 11.9 0 0.5 0 1-0.1 1.5C177.3 414.4 209 375.2 209 329.5zM183.6 253.5c0.4-0.5 0.6-1 0.5-1.6l-7.3-46.6c-1.3-8.2-8.3-14.2-16.6-14.2H62.1c-8.3 0-15.3 6-16.6 14.2l-8.2 52.5c-0.4 2.8-1.2 5.6-2.3 8.2 -1.1 2.7-2.4 5.2-4.1 7.6 0 0.1-0.1 0.1-0.1 0.2 -12 17.3-18 37.6-17.4 58.8 0.7 23.6 9.8 46.1 25.6 63.4 13.3 14.5 30.6 24.5 49.6 28.9 0-0.5-0.1-1-0.1-1.6 0-4.4 1.3-8.4 3.4-11.9 -37.1-8.7-64.8-42.1-64.8-81.8 0-46.3 37.7-84 84-84 2.1 0 46.8 2.7 70.1 8.5 0.1 0 0.2 0.1 0.3 0.1C182.3 254.3 183.1 254 183.6 253.5zM182.1 329.5c0-39.2-31.9-71-71-71 -39.2 0-71 31.9-71 71 0 39.2 31.9 71 71 71C150.3 400.5 182.1 368.6 182.1 329.5zM161.6 111.1c0-3.9-3.2-7-7-7s-7 3.2-7 7.1 3.2 7.1 7.1 7.1S161.6 115 161.6 111.1zM120.8 423.1c0-5.3-4.3-9.6-9.6-9.6 -5.3 0-9.6 4.3-9.6 9.6 0 5.3 4.3 9.6 9.6 9.6C116.4 432.8 120.8 428.4 120.8 423.1zM118.2 154.5c0-3.9-3.2-7-7.1-7 -3.9 0-7 3.2-7 7.1s3.2 7.1 7.1 7.1C115 161.6 118.2 158.4 118.2 154.5z" class="d"/><path d="M222.1 132.9c9.7 0 17.6 7.9 17.6 17.6 0 9.7-7.9 17.6-17.6 17.6 -9.7 0-17.6-7.9-17.6-17.6C204.5 140.8 212.4 132.9 222.1 132.9zM226.6 150.5c0-2.5-2.1-4.6-4.6-4.6 -2.5 0-4.6 2.1-4.6 4.6 0 2.5 2.1 4.6 4.6 4.6C224.6 155 226.6 153 226.6 150.5z" class="d"/><path d="M150.5 204.5c9.7 0 17.6 7.9 17.6 17.6 0 9.7-7.9 17.6-17.6 17.6 -9.7 0-17.6-7.9-17.6-17.6C132.9 212.4 140.8 204.5 150.5 204.5zM155 222.1c0-2.5-2.1-4.6-4.6-4.6 -2.5 0-4.6 2.1-4.6 4.6 0 2.5 2.1 4.6 4.6 4.6C153 226.6 155 224.6 155 222.1z" class="d"/></svg>
                </div>
                <div class="tagIconParent" v-if="isAvoid(player.id)" title="Avoid">
                    <svg class="tagIcon avoid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M507.5 140.5l-136-136C368.8 1.5 364.9 0 361 0H151c-3.9 0-7.8 1.5-10.5 4.5l-136 136C1.5 143.2 0 147.1 0 151v210c0 3.9 1.5 7.8 4.5 10.5l136 136C143.2 510.5 147.1 512 151 512h210c3.9 0 7.8-1.5 10.5-4.5l136-136C510.5 368.8 512 364.9 512 361V151C512 147.1 510.5 143.2 507.5 140.5z" class="a"/><path d="M512 151v210c0 3.9-1.5 7.8-4.5 10.5l-136 136C368.8 510.5 364.9 512 361 512H256V0h105c3.9 0 7.8 1.5 10.5 4.5l136 136C510.5 143.2 512 147.1 512 151z" class="b"/><path d="M446.5 165.4L346.6 65.5C343.9 62.5 340 61 336.1 61H175.9c-3.9 0-7.8 1.5-10.5 4.5L65.5 165.4C62.5 168.1 61 172 61 175.9V336.1c0 3.9 1.5 7.8 4.5 10.5L165.4 446.5c2.7 3 6.6 4.5 10.5 4.5H336.1c3.9 0 7.8-1.5 10.5-4.5l99.9-99.9c3-2.7 4.5-6.6 4.5-10.5v-160.2C451 172 449.5 168.1 446.5 165.4z" fill="#E0E4EC"/><path d="M451 175.9V336.1c0 3.9-1.5 7.8-4.5 10.5L346.6 446.5c-2.7 3-6.6 4.5-10.5 4.5H256V61h80.1c3.9 0 7.8 1.5 10.5 4.5l99.9 99.9C449.5 168.1 451 172 451 175.9z" fill="#D1D7E3"/><path d="M329.8 91H182.2L91 182.2v147.6L182.2 421H329.8l91.2-91.2v-147.6L329.8 91z" class="a"/><polygon points="421 182.2 421 329.8 329.8 421 256 421 256 91 329.8 91 " class="b"/></svg>
                </div>
                <div class="tagIconParent" v-if="isInjuryProne(player.id)" title="Injury Prone">
                    <svg class="tagIcon injuryProne" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40.3 488.4c-4.3 0-8.5-1.6-11.8-4.9 -6.5-6.5-6.5-17.1 0-23.6l138.7-138.7c6.5-6.5 17.1-6.5 23.6 0 6.5 6.5 6.5 17.1 0 23.6L52.1 483.5C48.8 486.8 44.5 488.4 40.3 488.4z" class="a"/><path d="M320.5 302.5c-4.3 0-8.5-1.6-11.8-4.9l-94.3-94.3c-6.5-6.5-6.5-17.1 0-23.6s17.1-6.5 23.6 0l94.3 94.3c6.5 6.5 6.5 17.1 0 23.6C329 300.9 324.7 302.5 320.5 302.5z" class="a"/><path d="M190.8 321.2L28.5 483.5c3.3 3.3 7.5 4.9 11.8 4.9s8.5-1.6 11.8-4.9l138.7-138.7C197.3 338.3 197.3 327.7 190.8 321.2z" class="b"/><path d="M308.7 297.6c3.3 3.3 7.5 4.9 11.8 4.9 4.3 0 8.5-1.6 11.8-4.9 6.5-6.5 6.5-17.1 0-23.6l-47.2-47.2 -23.6 23.6L308.7 297.6z" class="b"/><path d="M226.1 369.2c-22.3 0-43.2-8.7-58.9-24.4l0 0 0 0c-32.5-32.5-32.5-85.4 0-117.9L332.3 61.8c6.5-6.5 17.1-6.5 23.6 0l94.3 94.3c3.1 3.1 4.9 7.4 4.9 11.8s-1.8 8.7-4.9 11.8L285.1 344.8C269.4 360.6 248.4 369.2 226.1 369.2zM344.1 97.2L190.8 250.5c-19.5 19.5-19.5 51.2 0 70.7l0 0c9.4 9.5 22 14.7 35.4 14.7 13.4 0 25.9-5.2 35.4-14.7L414.8 167.9 344.1 97.2z" fill="#C4CAD9"/><path d="M226.1 369.2c22.3 0 43.2-8.7 59-24.4L450.2 179.7c3.1-3.1 4.9-7.4 4.9-11.8 0-4.4-1.8-8.7-4.9-11.8l-47.2-47.2 -23.6 23.6 35.4 35.4L261.5 321.2c-9.4 9.5-22 14.7-35.4 14.7 -13.4 0-25.9-5.2-35.4-14.6l-23.6 23.6C182.9 360.6 203.9 369.2 226.1 369.2z" fill="#B8BFCC"/><path d="M462 194.4c-13.4 0-25.9-5.2-35.4-14.7l0 0 0 0 -94.3-94.3c-9.5-9.4-14.7-22-14.7-35.4s5.2-25.9 14.7-35.4c9.4-9.5 22-14.7 35.4-14.7 13.4 0 25.9 5.2 35.4 14.6l94.3 94.3c9.5 9.5 14.7 22 14.7 35.4 0 13.4-5.2 25.9-14.7 35.4C487.9 189.2 475.3 194.4 462 194.4z" class="c"/><path d="M450.2 61.8l-70.7 70.7 47.2 47.2c9.4 9.5 22 14.7 35.4 14.7 13.4 0 25.9-5.2 35.4-14.6 9.5-9.5 14.7-22 14.7-35.4s-5.2-25.9-14.7-35.4L450.2 61.8z" class="d"/><path d="M63.8 512c-4.3 0-8.5-1.6-11.8-4.9L4.9 459.9c-6.5-6.5-6.5-17.1 0-23.6s17.1-6.5 23.6 0l47.2 47.2c6.5 6.5 6.5 17.1 0 23.6C72.4 510.4 68.1 512 63.8 512z" class="c"/><path d="M28.5 483.5l23.6 23.6c3.3 3.3 7.5 4.9 11.8 4.9s8.5-1.6 11.8-4.9c6.5-6.5 6.5-17.1 0-23.6L52.1 460l-23.6 23.6L28.5 483.5z" class="d"/></svg>
                </div>
                <div class="tagIconParent" v-if="isOverpriced(player.id)" title="Overpriced">
                    <svg class="tagIcon overpriced" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448.8 152.9L359.1 63.2c-27.2 27.2-71.3 27.2-98.5 0L0 323.8 188.2 512l260.6-260.6C421.6 224.2 421.6 180.1 448.8 152.9zM364.1 189.4c-11.4 11.4-30 11.4-41.4 0 -11.4-11.4-11.4-30 0-41.4 11.4-11.4 30-11.4 41.4 0C375.5 159.4 375.5 177.9 364.1 189.4z" fill="orange"/><path d="M350 174.3c-3.1 0-6.3-1.2-8.7-3.6 -4.8-4.8-4.8-12.6 0-17.4L491 3.6c4.8-4.8 12.6-4.8 17.4 0 4.8 4.8 4.8 12.6 0 17.4L358.7 170.7C356.3 173.1 353.2 174.3 350 174.3z" fill="#006b9f"/><path d="M99.4 349.6c-3.1 0-6.3-1.2-8.7-3.6 -4.8-4.8-4.8-12.6 0-17.4l142.6-142.6c4.8-4.8 12.6-4.8 17.4 0 4.8 4.8 4.8 12.6 0 17.4L108.1 346C105.7 348.4 102.6 349.6 99.4 349.6z" class="a"/><path d="M137.1 387.2c-3.1 0-6.3-1.2-8.7-3.6 -4.8-4.8-4.8-12.6 0-17.4l142.6-142.6c4.8-4.8 12.6-4.8 17.4 0 4.8 4.8 4.8 12.6 0 17.4L145.8 383.6C143.4 386 140.2 387.2 137.1 387.2z" class="a"/><path d="M174.7 424.8c-3.1 0-6.3-1.2-8.7-3.6 -4.8-4.8-4.8-12.6 0-17.4l93-93c4.8-4.8 12.6-4.8 17.4 0 4.8 4.8 4.8 12.6 0 17.4l-93 93C181 423.6 177.9 424.8 174.7 424.8z" class="a"/></svg>
                </div>
            </td>
            <td class="bye"> {{ player.nflTeam.bye }} <img v-bind:src="logoPath(player.nflTeam.name)" v-bind:alt="player.nflTeam.name" class="team-logo" /></td>
        </tr>
    </template>
</table>
</template>

<script>
import { getDomes, getPlayers, getTeamsCount, getTags, getTiers } from '../vuex/getters'
import logoMixin from '../mixins/logo'
import { fetchPlayers } from '../vuex/actions'

export default {
  created () {
    if (this.players.length === 0) {
      this.fetchPlayers()
    }
  },

  computed: {
    lastInTierIndexes: function () {
      return this.tiers.map(tier => {
        let updatedTier = { positionKey: tier.positionKey }
        updatedTier.lastInTier = tier.sizes
          .map((value, index, array) => array.slice(0, index + 1).reduce((sum, value) => sum + parseInt(value, 10)))
          .map(value => value - 1)
        return updatedTier
      })
    }
  },

  methods: {
    isAvoid: function (playerId) {
      return this.isInTag('avoid', playerId)
    },

    isDomeKicker: function (positionKey, teamName) {
      return positionKey === 'PK' && this.domes.includes(teamName)
    },

    isHandcuff: function (playerId) {
      return this.isInTag('handcuff', playerId)
    },

    isInjuryProne: function (playerId) {
      return this.isInTag('injuryprone', playerId)
    },

    isInTag: function (tag, playerId) {
      return this.tags.find(t => t.name === tag).players.find(p => p === playerId)
    },

    isLastInTier: function (positionKey, index) {
      let teamsInLeague = this.teamsCount
      let positionTiers = (this.lastInTierIndexes.find(tier => tier.positionKey === positionKey) || {}).lastInTier
      if (positionTiers === undefined || positionTiers.length === 0) { // for position without tiers and for the "All" view, create tiers based on number of teams in league
        return index > 1 && (index + 1) % teamsInLeague === 0
      }

      return positionTiers.find(i => i === index) !== undefined
    },

    isOverpriced: function (playerId) {
      return this.isInTag('overpriced', playerId)
    },

    isTarget: function (playerId) {
      return this.isInTag('target', playerId)
    },

    playersByPosition: function (position) {
      return this.players
        .filter(player => position === 'All' || player.positionKey === position)
    },

    positionPlusRanking: function (player) {
      return player.positionKey + player.ranking.position
    },

    previousRankMessage: function (currentRanking, previousRanking) {
      return currentRanking !== previousRanking ? 'Prev. Overall ' + previousRanking : ''
    }
  },

  props: {
    onlyDisplayAvailable: {
      type: Boolean
    },
    positionSelected: {
      type: String
    }
  },

  mixins: [logoMixin],

  vuex: {
    actions: {
      fetchPlayers
    },
    getters: {
      domes: getDomes,
      players: getPlayers,
      teamsCount: getTeamsCount,
      tags: getTags,
      tiers: getTiers
    }
  }
}
</script>

<style scoped>
/* Elements */
table {
  margin-top: 10px;
  width: 100%;
}

tr:nth-child(2n + 1) {
  background-color: #ececec;
}

td {
  padding: 0;
}

td:first-child,
td:last-child {
  text-align: right;
}

td:first-child {
  padding-left: 0;
}

td:last-child {
  padding-right: 10px;
}



/* Tags */
.tagIcon {
  height: 25px;
  margin-top: 3px;
}

.tagIconParent {
  cursor: help;
  display: inline-block;
}

.avoid .a {
  fill: #d94158;
}

.avoid .b {
  fill: #cc2944;
}

.dome {
  width: 25px;
}

.handcuff .a {
  fill: #b3b3b3;
}

.handcuff .b {
  fill: #8ad1d6;
}

.handcuff .c {
  fill: #6dc1cc;
}

.handcuff .d {
  fill: #333;
}

.injuryProne .a {
  fill: #a1a7b3;
}

.injuryProne .b {
  fill: #979ca7;
}

.injuryProne .c {
  fill: #5c5f66;
}

.injuryProne .d {
  fill: #53565c;
}

.overprice .a {
  fill:#181818;
}

.target .a {
  fill: #ff6464;
}

.target .b {
  fill: #4caf50;
}

.target .c {
  fill: #fff;
}



/* Other Classes */
.bye {
  font-size: 0.6em;
}

.lastInTier {
  border-bottom: solid black 3px;
}

.movement {
  cursor: help;
  font-size: 0.85em;
  padding-left: 0;
  padding-right: 0;
}

.movement.up {
  color: #4caf50;
  vertical-align: top;
}

.movement.down {
  color: #ff1744;
}

.onlyDisplayAvailable .unavailable {
  display: none;
}

.ranking {
  padding-right: 0;
}

.stdDev {
  font-size: 0.7em;
  padding-left: 0.2em;
}

.team-logo {
  height: 20px;
  width: 30px;
  vertical-align: middle;
}

.unavailable {
  font-style: italic;
  opacity: .3;
}

.unavailable.userDrafted {
  color: #4caf50;
  font-style: normal;
  opacity: 1;
}
</style>