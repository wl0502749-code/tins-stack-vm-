import{mkdirSync as m,readdirSync as r,readFileSync as f,writeFileSync as w}from'node:fs';import{join as j}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function v(o:number){return o<=7||o>=16&&o<=34||o>=48&&o<=52||o>=64&&o<=65||o>=80&&o<=83}
function run(P:Buffer,Q:Buffer):[Uint8Array,number]{const n=P.length,S=new Int32Array(256),R=new Int32Array(64),M=new Int32Array(256),T=new Uint8Array(65536);let s=0,c=0,p=0,t=0,l=0,q=0;const e=(x:number):[Uint8Array,number]=>[T.subarray(0,l),x];
for(;;){if(t===1e6)return e(10);if(p<0||p>=n)return e(9);const o=P[p];if(!v(o))return e(5);const i=o===1?1:o===2?4:o>=48&&o<=51?2:0;if(p+i>=n)return e(9);t++;const g=p+1+i;let a=0,b=0;
if(o===7){a=3;b=3}else if(o===5){a=2;b=2}else if(o===6){a=2;b=3}else if(o===3||o===4||o===23||o===27||o===49||o===50||o===64||o===80||o===81||o===83){a=1;b=o===4?2:o===64||o===23||o===27?1:0}else if(o>=16&&o<=22||o>=24&&o<=26||o>=28&&o<=30||o>=32&&o<=34||o===65){a=2;b=o===65?0:1}else if(o===1||o===2||o===82)b=1;
if(s<a)return e(2);if(s-a+b>256)return e(3);p=g;switch(o){case 0:return e(0);case 1:S[s++]=(P[g-1]<<24)>>24;break;case 2:S[s++]=P[g-4]|P[g-3]<<8|P[g-2]<<16|P[g-1]<<24;break;case 3:s--;break;case 4:S[s]=S[s-1];s++;break;
case 5:{const k=S[s-1];S[s-1]=S[s-2];S[s-2]=k;break}case 6:S[s]=S[s-2];s++;break;case 7:{const k=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=k;break}
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{const y=S[s-1],x=S[s-2];let z=0;
if(o===16)z=x+y;else if(o===17)z=x-y;else if(o===18)z=Math.imul(x,y);else if(o===19){if(!y)return e(4);z=x===-2147483648&&y===-1?x:x/y}else if(o===20){if(!y)return e(4);z=y===-1?0:x%y}else if(o===21){if(!y)return e(4);z=Math.floor((x>>>0)/(y>>>0))}else if(o===22){if(!y)return e(4);z=(x>>>0)%(y>>>0)}else if(o===24)z=x&y;else if(o===25)z=x|y;else if(o===26)z=x^y;else if(o===28)z=x<<(y&31);else if(o===29)z=x>>(y&31);else if(o===30)z=x>>>(y&31);else if(o===32)z=x===y?1:0;else if(o===33)z=x<y?1:0;else z=(x>>>0)<(y>>>0)?1:0;s-=2;S[s++]=z;break}
case 23:S[s-1]=-S[s-1];break;case 27:S[s-1]=~S[s-1];break;
case 48:case 49:case 50:{const k=((P[g-2]|P[g-1]<<8)<<16)>>16;if(o===48)p=g+k;else{const z=S[--s];if((o===49)===(z===0))p=g+k}break}
case 51:if(c===64)return e(7);R[c++]=g;p=P[g-2]|P[g-1]<<8;break;case 52:if(!c)return e(8);p=R[--c];break;
case 64:{const k=S[s-1];if(k<0||k>255)return e(6);S[s-1]=M[k];break}case 65:{const k=S[s-1],z=S[s-2];if(k<0||k>255)return e(6);s-=2;M[k]=z;break}
case 80:{const k=String(S[s-1]);if(l+k.length>65536)return e(11);s--;for(let d=0;d<k.length;d++)T[l++]=k.charCodeAt(d);break}case 81:if(l+1>65536)return e(11);T[l++]=S[--s]&255;break;case 82:S[s++]=q<Q.length?Q[q++]:-1;break;case 83:return e(S[--s]&255)}}}
for(const d of r(I).sort()){const A=run(f(j(I,d,'program.bin')),f(j(I,d,'input.bin')));m(j(O,d),{recursive:true});w(j(O,d,'stdout.bin'),A[0]);w(j(O,d,'exit.txt'),A[1]+'\n')}
