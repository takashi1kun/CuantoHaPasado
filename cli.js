#!/usr/bin/env node
"use strict";

const [,, ...args] = process.argv;

function divRest(a, b) {
  return [~~(a / b), a % b];
}
//cloneRegExp comes from https://www.bennadel.com/blog/2664-cloning-regexp-regular-expression-objects-in-javascript.htm
function cloneRegExp( input, injectFlags ) {
		var pattern = input.source;
		var flags = "";
		injectFlags = ( injectFlags || "" );
		if ( input.global || ( /g/i ).test( injectFlags ) ) {
			flags += "g";
		}
		if ( input.ignoreCase || ( /i/i ).test( injectFlags ) ) {
			flags += "i";
		}
		if ( input.multiline || ( /m/i ).test( injectFlags ) ) {
			flags += "m";
		}
		return( new RegExp( pattern, flags ) );

	}
function strOArr(a) {
  const regex = /(\d\d):?(\d\d)?:?(\d\d)?/mg; //@ts-ignore

  let time = a.constructor.name == "Array" ? a : cloneRegExp(regex).exec(a).filter((x,i) => i!=0).map(x => x * 1);
  let totalSeconds = 0;
  totalSeconds += time[0] ? time[0] * 60 * 60 : 0;
  totalSeconds += time[1] ? time[1] * 60 : 0;
  totalSeconds += time[2] ? time[2] * 1 : 0;
  return totalSeconds;
}

function rangoDeTiempo(hora1, hora2) {
  const s1 = strOArr(hora1);
  const s2 = strOArr(hora2);
  let differenceSec = s1 > s2 ? s1 - s2 : s2 - s1;
  let res = [];

  for (let i = 0; differenceSec > 0 && i < 3; i++) {
    let div;

    switch (i) {
      case 0:
        div = 60 * 60;
        break;

      case 1:
        div = 60;
        break;

      case 2:
        div = 1;
        break;
    }

    let r = divRest(differenceSec, div);
    differenceSec = r[1];
    res[i] = r[0];
  }

  let resString = `Tiempo que ha pasado:`;
  resString += res[0] ? `\n${res[0]} Horas` : "";
  resString += res[1] ? `,\n${res[1]} Minutos` : "";
  resString += res[2] ? `,\n${res[2]} Segundos` : "";
  return resString;
}

console.log(rangoDeTiempo(args[0], args[1]));
