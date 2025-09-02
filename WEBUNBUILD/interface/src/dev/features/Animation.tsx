import { debugData } from "@/hook";

export const Animation = (visible: boolean) => {
  debugData([
    {
      action: 'nui:animation:visible',
      data: visible
    } 
  ]);

  debugData([
    {
      action: 'nui:animation:data',
      data: {
        subcategories: {
          emotes: {
            Salsa: [
              { name: 'Salsa Dance', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz', AnimationOptions: {
                AnimationLoop: true,
                Props: 'DVBAzjdbuazjdbuaz',
                PropsPlacement: 'dbvabdzabdazbdaz',
                SecondProps: 'aabdzabdazntset,',
                SecondPropsPlacement: 'abdazbdazbd'
              }},
              { name: 'Salsa Spin', dist: '' },
              { name: 'Salsa Chore', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa add', dist: '' },
              { name: 'Salsa vv', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa bdab', dist: '' },
              { name: 'Salsa naznqz', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa Spin', dist: '' },
              { name: 'Salsa nqfqnd', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa nfqs', dist: '' },
              { name: 'Salsa Daqzf,qzfqzf,zqfqznce', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa Spfnqsfifnqsn', dist: '' },
              { name: 'Salsa Daqsfnzqrf,nce', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa Spqsnfsqnqsfn', dist: '' },
              { name: 'Salsa Daqfnqsfnnce', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa qnfsqfns', dist: '' },
              { name: 'Salsa Dqfnsqfnqsance', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa Snfqsfnqsfnsin', dist: '' },
              { name: 'Salsa Dafnsfnqfsqnce', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa Spf,qzfqz,fqz,fin', dist: '' },
              { name: 'Salsa Dqfz,fqpqz,fqz,fqzin', dist: '' },
              { name: 'Salsa Dafzq,fqz,nce', dist: '@dvazbdiaz-jdauzbdazbdazd_azbd_azdbaz_dbazdbaz' },
              { name: 'Salsa Spqfz,zq,fqzin', dist: '' },
            ],
            Hiphop: [
              { name: 'Hip-hop Dance', dist: '' },
              { name: 'Breakdance', dist: '' }
            ],
            Jazz: [
              { name: 'Jazz Hands', dist: '' },
              { name: 'Jazz Pose', dist: '' }
            ]
          },
          walk: {
            Normal: [
              { name: 'Normal Walk', dist: '' },
              { name: 'Casual Walk', dist: '' }
            ],
            Fast: [
              { name: 'Fast Walk', dist: '' },
              { name: 'Jog', dist: '' }
            ],
            Slow: [
              { name: 'Slow Walk', dist: '' },
              { name: 'Stroll', dist: '' }
            ]
          },
          expresion: {
            Happy: [
              { name: 'Happy Expression', dist: '' },
              { name: 'Smiling', dist: '14' }
            ],
            Sad: [
              { name: 'Sad Expression', dist: '15' },
              { name: 'Frown', dist: '16' }
            ],
            Angry: [
              { name: 'Angry Expression', dist: '17' },
              { name: 'Furious', dist: '18' }
            ]
          }
        }
      }
    }
  ]);
};
