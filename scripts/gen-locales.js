const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');

const langs = {
  es: { home_title:'Verifica Requisitos de Visa al Instante', vf:'Sin Visa', voa:'Visa a la Llegada', ev:'eVisa Requerida', vr:'Visa Requerida', disc:'Los requisitos de visa cambian frecuentemente. Siempre verifica con las embajadas oficiales.' },
  fr: { home_title:'Vérifiez les exigences de visa instantanément', vf:'Sans Visa', voa:"Visa à l'arrivée", ev:'eVisa Requis', vr:'Visa Requis', disc:'Les exigences de visa changent fréquemment. Vérifiez toujours auprès des ambassades officielles.' },
  de: { home_title:'Visaanforderungen sofort prüfen', vf:'Visafrei', voa:'Visum bei Ankunft', ev:'eVisa erforderlich', vr:'Visum erforderlich', disc:'Visaanforderungen ändern sich häufig. Immer bei offiziellen Botschaften prüfen.' },
  ja: { home_title:'ビザ要件を即座に確認', vf:'ビザ不要', voa:'到着時ビザ', ev:'電子ビザ必要', vr:'ビザ必要', disc:'ビザ要件は頻繁に変わります。旅行前に大使館で必ず確認してください。' },
  ko: { home_title:'비자 요건 즉시 확인', vf:'비자 면제', voa:'도착 비자', ev:'전자 비자 필요', vr:'비자 필요', disc:'비자 요건은 자주 변경됩니다. 공식 대사관에서 항상 확인하세요.' },
  pt: { home_title:'Verifique Requisitos de Visto Instantaneamente', vf:'Sem Visto', voa:'Visto na Chegada', ev:'eVisto Necessário', vr:'Visto Necessário', disc:'Os requisitos de visto mudam frequentemente. Verifique sempre nas embaixadas oficiais.' },
  zh: { home_title:'即时查看签证要求', vf:'免签', voa:'落地签', ev:'需要电子签证', vr:'需要签证', disc:'签证要求经常变化。出行前请务必通过官方大使馆核实。' }
};

for (const [lang, t] of Object.entries(langs)) {
  const msg = {
    nav: { home:'Home', passports:'Passports', destinations:'Destinations', rankings:'Rankings', guide:'Guide' },
    home: { title: t.home_title, subtitle:'', passportLabel:'Passport', destinationLabel:'Destination', checkButton:'Check', selectPassport:'Select...', selectDestination:'Select...', popularPassports:'Popular', topDestinations:'Top Destinations' },
    result: { visaFree: t.vf, visaOnArrival: t.voa, eVisa: t.ev, visaRequired: t.vr, stayDuration:'Stay', days:'days', processingTime:'Processing', fee:'Fee', free:'Free', notes:'Notes', applyNow:'Apply' },
    rankings: { title:'Passport Index 2025', subtitle:'', rank:'Rank', country:'Country', visaFreeAccess:'Visa-Free', countries:'countries' },
    passports: { title:'Passports', subtitle:'', visaFreeCount:'Visa-Free', viewDetails:'Details' },
    destinations: { title:'Destinations', subtitle:'', visaFreePassports:'Visa-Free Passports', viewDetails:'Details' },
    footer: { tagline:'', disclaimer: t.disc, visitorsToday:'Today', totalVisitors:'Total', allRightsReserved:'All rights reserved.' },
    guide: { tourist:'Tourist', business:'Business', student:'Student', workingHoliday:'Working Holiday' }
  };
  fs.writeFileSync(path.join(messagesDir, lang + '.json'), JSON.stringify(msg, null, 2));
  console.log('Wrote ' + lang + '.json');
}
