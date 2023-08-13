'use strict';

/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var n,e,i=9e15,r=1e9,t="0123456789abcdef",s="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",o="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",u={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-i,maxE:i,crypto:!1},c=!0,f="[DecimalError] ",a=f+"Invalid argument: ",h=f+"Precision limit exceeded",l=f+"crypto unavailable",d="[object Decimal]",g=Math.floor,p=Math.pow,m=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,w=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,v=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,N=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,b=1e7,E=7,x=s.length-1,y=o.length-1,M={toStringTag:d};function q(n){var e,i,r,t=n.length-1,s="",o=n[0];if(t>0){for(s+=o,e=1;e<t;e++)r=n[e]+"",(i=E-r.length)&&(s+=L(i)),s+=r;o=n[e],(i=E-(r=o+"").length)&&(s+=L(i));}else if(0===o)return "0";for(;o%10==0;)o/=10;return s+o}function O(n,e,i){if(n!==~~n||n<e||n>i)throw Error(a+n)}function D(n,e,i,r){var t,s,o,u;for(s=n[0];s>=10;s/=10)--e;return --e<0?(e+=E,t=0):(t=Math.ceil((e+1)/E),e%=E),s=p(10,E-e),u=n[t]%s|0,null==r?e<3?(0==e?u=u/100|0:1==e&&(u=u/10|0),o=i<4&&99999==u||i>3&&49999==u||5e4==u||0==u):o=(i<4&&u+1==s||i>3&&u+1==s/2)&&(n[t+1]/s/100|0)==p(10,e-2)-1||(u==s/2||0==u)&&0==(n[t+1]/s/100|0):e<4?(0==e?u=u/1e3|0:1==e?u=u/100|0:2==e&&(u=u/10|0),o=(r||i<4)&&9999==u||!r&&i>3&&4999==u):o=((r||i<4)&&u+1==s||!r&&i>3&&u+1==s/2)&&(n[t+1]/s/1e3|0)==p(10,e-3)-1,o}function F(n,e,i){for(var r,s,o=[0],u=0,c=n.length;u<c;){for(s=o.length;s--;)o[s]*=e;for(o[0]+=t.indexOf(n.charAt(u++)),r=0;r<o.length;r++)o[r]>i-1&&(void 0===o[r+1]&&(o[r+1]=0),o[r+1]+=o[r]/i|0,o[r]%=i);}return o.reverse()}M.absoluteValue=M.abs=function(){var n=new this.constructor(this);return n.s<0&&(n.s=1),Z(n)},M.ceil=function(){return Z(new this.constructor(this),this.e+1,2)},M.clampedTo=M.clamp=function(n,e){var i=this,r=i.constructor;if(n=new r(n),e=new r(e),!n.s||!e.s)return new r(NaN);if(n.gt(e))throw Error(a+e);return i.cmp(n)<0?n:i.cmp(e)>0?e:new r(i)},M.comparedTo=M.cmp=function(n){var e,i,r,t,s=this,o=s.d,u=(n=new s.constructor(n)).d,c=s.s,f=n.s;if(!o||!u)return c&&f?c!==f?c:o===u?0:!o^c<0?1:-1:NaN;if(!o[0]||!u[0])return o[0]?c:u[0]?-f:0;if(c!==f)return c;if(s.e!==n.e)return s.e>n.e^c<0?1:-1;for(e=0,i=(r=o.length)<(t=u.length)?r:t;e<i;++e)if(o[e]!==u[e])return o[e]>u[e]^c<0?1:-1;return r===t?0:r>t^c<0?1:-1},M.cosine=M.cos=function(){var n,i,r=this,t=r.constructor;return r.d?r.d[0]?(n=t.precision,i=t.rounding,t.precision=n+Math.max(r.e,r.sd())+E,t.rounding=1,r=function(n,e){var i,r,t;if(e.isZero())return e;r=e.d.length,r<32?t=(1/W(4,i=Math.ceil(r/3))).toString():(i=16,t="2.3283064365386962890625e-10");n.precision+=i,e=j(n,1,e.times(t),new n(1));for(var s=i;s--;){var o=e.times(e);e=o.times(o).minus(o).times(8).plus(1);}return n.precision-=i,e}(t,J(t,r)),t.precision=n,t.rounding=i,Z(2==e||3==e?r.neg():r,n,i,!0)):new t(1):new t(NaN)},M.cubeRoot=M.cbrt=function(){var n,e,i,r,t,s,o,u,f,a,h=this,l=h.constructor;if(!h.isFinite()||h.isZero())return new l(h);for(c=!1,(s=h.s*p(h.s*h,1/3))&&Math.abs(s)!=1/0?r=new l(s.toString()):(i=q(h.d),(s=((n=h.e)-i.length+1)%3)&&(i+=1==s||-2==s?"0":"00"),s=p(i,1/3),n=g((n+1)/3)-(n%3==(n<0?-1:2)),(r=new l(i=s==1/0?"5e"+n:(i=s.toExponential()).slice(0,i.indexOf("e")+1)+n)).s=h.s),o=(n=l.precision)+3;;)if(a=(f=(u=r).times(u).times(u)).plus(h),r=A(a.plus(h).times(u),a.plus(f),o+2,1),q(u.d).slice(0,o)===(i=q(r.d)).slice(0,o)){if("9999"!=(i=i.slice(o-3,o+1))&&(t||"4999"!=i)){+i&&(+i.slice(1)||"5"!=i.charAt(0))||(Z(r,n+1,1),e=!r.times(r).times(r).eq(h));break}if(!t&&(Z(u,n+1,0),u.times(u).times(u).eq(h))){r=u;break}o+=4,t=1;}return c=!0,Z(r,n,l.rounding,e)},M.decimalPlaces=M.dp=function(){var n,e=this.d,i=NaN;if(e){if(i=((n=e.length-1)-g(this.e/E))*E,n=e[n])for(;n%10==0;n/=10)i--;i<0&&(i=0);}return i},M.dividedBy=M.div=function(n){return A(this,new this.constructor(n))},M.dividedToIntegerBy=M.divToInt=function(n){var e=this.constructor;return Z(A(this,new e(n),0,1,1),e.precision,e.rounding)},M.equals=M.eq=function(n){return 0===this.cmp(n)},M.floor=function(){return Z(new this.constructor(this),this.e+1,3)},M.greaterThan=M.gt=function(n){return this.cmp(n)>0},M.greaterThanOrEqualTo=M.gte=function(n){var e=this.cmp(n);return 1==e||0===e},M.hyperbolicCosine=M.cosh=function(){var n,e,i,r,t,s=this,o=s.constructor,u=new o(1);if(!s.isFinite())return new o(s.s?1/0:NaN);if(s.isZero())return u;i=o.precision,r=o.rounding,o.precision=i+Math.max(s.e,s.sd())+4,o.rounding=1,(t=s.d.length)<32?e=(1/W(4,n=Math.ceil(t/3))).toString():(n=16,e="2.3283064365386962890625e-10"),s=j(o,1,s.times(e),new o(1),!0);for(var c,f=n,a=new o(8);f--;)c=s.times(s),s=u.minus(c.times(a.minus(c.times(a))));return Z(s,o.precision=i,o.rounding=r,!0)},M.hyperbolicSine=M.sinh=function(){var n,e,i,r,t=this,s=t.constructor;if(!t.isFinite()||t.isZero())return new s(t);if(e=s.precision,i=s.rounding,s.precision=e+Math.max(t.e,t.sd())+4,s.rounding=1,(r=t.d.length)<3)t=j(s,2,t,t,!0);else {n=(n=1.4*Math.sqrt(r))>16?16:0|n,t=j(s,2,t=t.times(1/W(5,n)),t,!0);for(var o,u=new s(5),c=new s(16),f=new s(20);n--;)o=t.times(t),t=t.times(u.plus(o.times(c.times(o).plus(f))));}return s.precision=e,s.rounding=i,Z(t,e,i,!0)},M.hyperbolicTangent=M.tanh=function(){var n,e,i=this,r=i.constructor;return i.isFinite()?i.isZero()?new r(i):(n=r.precision,e=r.rounding,r.precision=n+7,r.rounding=1,A(i.sinh(),i.cosh(),r.precision=n,r.rounding=e)):new r(i.s)},M.inverseCosine=M.acos=function(){var n,e=this,i=e.constructor,r=e.abs().cmp(1),t=i.precision,s=i.rounding;return -1!==r?0===r?e.isNeg()?T(i,t,s):new i(0):new i(NaN):e.isZero()?T(i,t+4,s).times(.5):(i.precision=t+6,i.rounding=1,e=e.asin(),n=T(i,t+4,s).times(.5),i.precision=t,i.rounding=s,n.minus(e))},M.inverseHyperbolicCosine=M.acosh=function(){var n,e,i=this,r=i.constructor;return i.lte(1)?new r(i.eq(1)?0:NaN):i.isFinite()?(n=r.precision,e=r.rounding,r.precision=n+Math.max(Math.abs(i.e),i.sd())+4,r.rounding=1,c=!1,i=i.times(i).minus(1).sqrt().plus(i),c=!0,r.precision=n,r.rounding=e,i.ln()):new r(i)},M.inverseHyperbolicSine=M.asinh=function(){var n,e,i=this,r=i.constructor;return !i.isFinite()||i.isZero()?new r(i):(n=r.precision,e=r.rounding,r.precision=n+2*Math.max(Math.abs(i.e),i.sd())+6,r.rounding=1,c=!1,i=i.times(i).plus(1).sqrt().plus(i),c=!0,r.precision=n,r.rounding=e,i.ln())},M.inverseHyperbolicTangent=M.atanh=function(){var n,e,i,r,t=this,s=t.constructor;return t.isFinite()?t.e>=0?new s(t.abs().eq(1)?t.s/0:t.isZero()?t:NaN):(n=s.precision,e=s.rounding,r=t.sd(),Math.max(r,n)<2*-t.e-1?Z(new s(t),n,e,!0):(s.precision=i=r-t.e,t=A(t.plus(1),new s(1).minus(t),i+n,1),s.precision=n+4,s.rounding=1,t=t.ln(),s.precision=n,s.rounding=e,t.times(.5))):new s(NaN)},M.inverseSine=M.asin=function(){var n,e,i,r,t=this,s=t.constructor;return t.isZero()?new s(t):(e=t.abs().cmp(1),i=s.precision,r=s.rounding,-1!==e?0===e?((n=T(s,i+4,r).times(.5)).s=t.s,n):new s(NaN):(s.precision=i+6,s.rounding=1,t=t.div(new s(1).minus(t.times(t)).sqrt().plus(1)).atan(),s.precision=i,s.rounding=r,t.times(2)))},M.inverseTangent=M.atan=function(){var n,e,i,r,t,s,o,u,f,a=this,h=a.constructor,l=h.precision,d=h.rounding;if(a.isFinite()){if(a.isZero())return new h(a);if(a.abs().eq(1)&&l+4<=y)return (o=T(h,l+4,d).times(.25)).s=a.s,o}else {if(!a.s)return new h(NaN);if(l+4<=y)return (o=T(h,l+4,d).times(.5)).s=a.s,o}for(h.precision=u=l+10,h.rounding=1,n=i=Math.min(28,u/E+2|0);n;--n)a=a.div(a.times(a).plus(1).sqrt().plus(1));for(c=!1,e=Math.ceil(u/E),r=1,f=a.times(a),o=new h(a),t=a;-1!==n;)if(t=t.times(f),s=o.minus(t.div(r+=2)),t=t.times(f),void 0!==(o=s.plus(t.div(r+=2))).d[e])for(n=e;o.d[n]===s.d[n]&&n--;);return i&&(o=o.times(2<<i-1)),c=!0,Z(o,h.precision=l,h.rounding=d,!0)},M.isFinite=function(){return !!this.d},M.isInteger=M.isInt=function(){return !!this.d&&g(this.e/E)>this.d.length-2},M.isNaN=function(){return !this.s},M.isNegative=M.isNeg=function(){return this.s<0},M.isPositive=M.isPos=function(){return this.s>0},M.isZero=function(){return !!this.d&&0===this.d[0]},M.lessThan=M.lt=function(n){return this.cmp(n)<0},M.lessThanOrEqualTo=M.lte=function(n){return this.cmp(n)<1},M.logarithm=M.log=function(n){var e,i,r,t,s,o,u,f,a=this,h=a.constructor,l=h.precision,d=h.rounding;if(null==n)n=new h(10),e=!0;else {if(i=(n=new h(n)).d,n.s<0||!i||!i[0]||n.eq(1))return new h(NaN);e=n.eq(10);}if(i=a.d,a.s<0||!i||!i[0]||a.eq(1))return new h(i&&!i[0]?-1/0:1!=a.s?NaN:i?0:1/0);if(e)if(i.length>1)s=!0;else {for(t=i[0];t%10==0;)t/=10;s=1!==t;}if(c=!1,o=H(a,u=l+5),r=e?R(h,u+10):H(n,u),D((f=A(o,r,u,1)).d,t=l,d))do{if(o=H(a,u+=10),r=e?R(h,u+10):H(n,u),f=A(o,r,u,1),!s){+q(f.d).slice(t+1,t+15)+1==1e14&&(f=Z(f,l+1,0));break}}while(D(f.d,t+=10,d));return c=!0,Z(f,l,d)},M.minus=M.sub=function(n){var e,i,r,t,s,o,u,f,a,h,l,d,p=this,m=p.constructor;if(n=new m(n),!p.d||!n.d)return p.s&&n.s?p.d?n.s=-n.s:n=new m(n.d||p.s!==n.s?p:NaN):n=new m(NaN),n;if(p.s!=n.s)return n.s=-n.s,p.plus(n);if(a=p.d,d=n.d,u=m.precision,f=m.rounding,!a[0]||!d[0]){if(d[0])n.s=-n.s;else {if(!a[0])return new m(3===f?-0:0);n=new m(p);}return c?Z(n,u,f):n}if(i=g(n.e/E),h=g(p.e/E),a=a.slice(),s=h-i){for((l=s<0)?(e=a,s=-s,o=d.length):(e=d,i=h,o=a.length),s>(r=Math.max(Math.ceil(u/E),o)+2)&&(s=r,e.length=1),e.reverse(),r=s;r--;)e.push(0);e.reverse();}else {for((l=(r=a.length)<(o=d.length))&&(o=r),r=0;r<o;r++)if(a[r]!=d[r]){l=a[r]<d[r];break}s=0;}for(l&&(e=a,a=d,d=e,n.s=-n.s),o=a.length,r=d.length-o;r>0;--r)a[o++]=0;for(r=d.length;r>s;){if(a[--r]<d[r]){for(t=r;t&&0===a[--t];)a[t]=b-1;--a[t],a[r]+=b;}a[r]-=d[r];}for(;0===a[--o];)a.pop();for(;0===a[0];a.shift())--i;return a[0]?(n.d=a,n.e=P(a,i),c?Z(n,u,f):n):new m(3===f?-0:0)},M.modulo=M.mod=function(n){var e,i=this,r=i.constructor;return n=new r(n),!i.d||!n.s||n.d&&!n.d[0]?new r(NaN):!n.d||i.d&&!i.d[0]?Z(new r(i),r.precision,r.rounding):(c=!1,9==r.modulo?(e=A(i,n.abs(),0,3,1)).s*=n.s:e=A(i,n,0,r.modulo,1),e=e.times(n),c=!0,i.minus(e))},M.naturalExponential=M.exp=function(){return C(this)},M.naturalLogarithm=M.ln=function(){return H(this)},M.negated=M.neg=function(){var n=new this.constructor(this);return n.s=-n.s,Z(n)},M.plus=M.add=function(n){var e,i,r,t,s,o,u,f,a,h,l=this,d=l.constructor;if(n=new d(n),!l.d||!n.d)return l.s&&n.s?l.d||(n=new d(n.d||l.s===n.s?l:NaN)):n=new d(NaN),n;if(l.s!=n.s)return n.s=-n.s,l.minus(n);if(a=l.d,h=n.d,u=d.precision,f=d.rounding,!a[0]||!h[0])return h[0]||(n=new d(l)),c?Z(n,u,f):n;if(s=g(l.e/E),r=g(n.e/E),a=a.slice(),t=s-r){for(t<0?(i=a,t=-t,o=h.length):(i=h,r=s,o=a.length),t>(o=(s=Math.ceil(u/E))>o?s+1:o+1)&&(t=o,i.length=1),i.reverse();t--;)i.push(0);i.reverse();}for((o=a.length)-(t=h.length)<0&&(t=o,i=h,h=a,a=i),e=0;t;)e=(a[--t]=a[t]+h[t]+e)/b|0,a[t]%=b;for(e&&(a.unshift(e),++r),o=a.length;0==a[--o];)a.pop();return n.d=a,n.e=P(a,r),c?Z(n,u,f):n},M.precision=M.sd=function(n){var e,i=this;if(void 0!==n&&n!==!!n&&1!==n&&0!==n)throw Error(a+n);return i.d?(e=_(i.d),n&&i.e+1>e&&(e=i.e+1)):e=NaN,e},M.round=function(){var n=this,e=n.constructor;return Z(new e(n),n.e+1,e.rounding)},M.sine=M.sin=function(){var n,i,r=this,t=r.constructor;return r.isFinite()?r.isZero()?new t(r):(n=t.precision,i=t.rounding,t.precision=n+Math.max(r.e,r.sd())+E,t.rounding=1,r=function(n,e){var i,r=e.d.length;if(r<3)return e.isZero()?e:j(n,2,e,e);i=(i=1.4*Math.sqrt(r))>16?16:0|i,e=e.times(1/W(5,i)),e=j(n,2,e,e);for(var t,s=new n(5),o=new n(16),u=new n(20);i--;)t=e.times(e),e=e.times(s.plus(t.times(o.times(t).minus(u))));return e}(t,J(t,r)),t.precision=n,t.rounding=i,Z(e>2?r.neg():r,n,i,!0)):new t(NaN)},M.squareRoot=M.sqrt=function(){var n,e,i,r,t,s,o=this,u=o.d,f=o.e,a=o.s,h=o.constructor;if(1!==a||!u||!u[0])return new h(!a||a<0&&(!u||u[0])?NaN:u?o:1/0);for(c=!1,0==(a=Math.sqrt(+o))||a==1/0?(((e=q(u)).length+f)%2==0&&(e+="0"),a=Math.sqrt(e),f=g((f+1)/2)-(f<0||f%2),r=new h(e=a==1/0?"5e"+f:(e=a.toExponential()).slice(0,e.indexOf("e")+1)+f)):r=new h(a.toString()),i=(f=h.precision)+3;;)if(r=(s=r).plus(A(o,s,i+2,1)).times(.5),q(s.d).slice(0,i)===(e=q(r.d)).slice(0,i)){if("9999"!=(e=e.slice(i-3,i+1))&&(t||"4999"!=e)){+e&&(+e.slice(1)||"5"!=e.charAt(0))||(Z(r,f+1,1),n=!r.times(r).eq(o));break}if(!t&&(Z(s,f+1,0),s.times(s).eq(o))){r=s;break}i+=4,t=1;}return c=!0,Z(r,f,h.rounding,n)},M.tangent=M.tan=function(){var n,i,r=this,t=r.constructor;return r.isFinite()?r.isZero()?new t(r):(n=t.precision,i=t.rounding,t.precision=n+10,t.rounding=1,(r=r.sin()).s=1,r=A(r,new t(1).minus(r.times(r)).sqrt(),n+10,0),t.precision=n,t.rounding=i,Z(2==e||4==e?r.neg():r,n,i,!0)):new t(NaN)},M.times=M.mul=function(n){var e,i,r,t,s,o,u,f,a,h=this,l=h.constructor,d=h.d,p=(n=new l(n)).d;if(n.s*=h.s,!(d&&d[0]&&p&&p[0]))return new l(!n.s||d&&!d[0]&&!p||p&&!p[0]&&!d?NaN:d&&p?0*n.s:n.s/0);for(i=g(h.e/E)+g(n.e/E),(f=d.length)<(a=p.length)&&(s=d,d=p,p=s,o=f,f=a,a=o),s=[],r=o=f+a;r--;)s.push(0);for(r=a;--r>=0;){for(e=0,t=f+r;t>r;)u=s[t]+p[r]*d[t-r-1]+e,s[t--]=u%b|0,e=u/b|0;s[t]=(s[t]+e)%b|0;}for(;!s[--o];)s.pop();return e?++i:s.shift(),n.d=s,n.e=P(s,i),c?Z(n,l.precision,l.rounding):n},M.toBinary=function(n,e){return z(this,2,n,e)},M.toDecimalPlaces=M.toDP=function(n,e){var i=this,t=i.constructor;return i=new t(i),void 0===n?i:(O(n,0,r),void 0===e?e=t.rounding:O(e,0,8),Z(i,n+i.e+1,e))},M.toExponential=function(n,e){var i,t=this,s=t.constructor;return void 0===n?i=S(t,!0):(O(n,0,r),void 0===e?e=s.rounding:O(e,0,8),i=S(t=Z(new s(t),n+1,e),!0,n+1)),t.isNeg()&&!t.isZero()?"-"+i:i},M.toFixed=function(n,e){var i,t,s=this,o=s.constructor;return void 0===n?i=S(s):(O(n,0,r),void 0===e?e=o.rounding:O(e,0,8),i=S(t=Z(new o(s),n+s.e+1,e),!1,n+t.e+1)),s.isNeg()&&!s.isZero()?"-"+i:i},M.toFraction=function(n){var e,i,r,t,s,o,u,f,h,l,d,g,m=this,w=m.d,v=m.constructor;if(!w)return new v(m);if(h=i=new v(1),r=f=new v(0),o=(s=(e=new v(r)).e=_(w)-m.e-1)%E,e.d[0]=p(10,o<0?E+o:o),null==n)n=s>0?e:h;else {if(!(u=new v(n)).isInt()||u.lt(h))throw Error(a+u);n=u.gt(e)?s>0?e:h:u;}for(c=!1,u=new v(q(w)),l=v.precision,v.precision=s=w.length*E*2;d=A(u,e,0,1,1),1!=(t=i.plus(d.times(r))).cmp(n);)i=r,r=t,t=h,h=f.plus(d.times(t)),f=t,t=e,e=u.minus(d.times(t)),u=t;return t=A(n.minus(i),r,0,1,1),f=f.plus(t.times(h)),i=i.plus(t.times(r)),f.s=h.s=m.s,g=A(h,r,s,1).minus(m).abs().cmp(A(f,i,s,1).minus(m).abs())<1?[h,r]:[f,i],v.precision=l,c=!0,g},M.toHexadecimal=M.toHex=function(n,e){return z(this,16,n,e)},M.toNearest=function(n,e){var i=this,r=i.constructor;if(i=new r(i),null==n){if(!i.d)return i;n=new r(1),e=r.rounding;}else {if(n=new r(n),void 0===e?e=r.rounding:O(e,0,8),!i.d)return n.s?i:n;if(!n.d)return n.s&&(n.s=i.s),n}return n.d[0]?(c=!1,i=A(i,n,0,e,1).times(n),c=!0,Z(i)):(n.s=i.s,i=n),i},M.toNumber=function(){return +this},M.toOctal=function(n,e){return z(this,8,n,e)},M.toPower=M.pow=function(n){var e,i,r,t,s,o,u=this,f=u.constructor,a=+(n=new f(n));if(!(u.d&&n.d&&u.d[0]&&n.d[0]))return new f(p(+u,a));if((u=new f(u)).eq(1))return u;if(r=f.precision,s=f.rounding,n.eq(1))return Z(u,r,s);if((e=g(n.e/E))>=n.d.length-1&&(i=a<0?-a:a)<=9007199254740991)return t=U(f,u,i,r),n.s<0?new f(1).div(t):Z(t,r,s);if((o=u.s)<0){if(e<n.d.length-1)return new f(NaN);if(0==(1&n.d[e])&&(o=1),0==u.e&&1==u.d[0]&&1==u.d.length)return u.s=o,u}return (e=0!=(i=p(+u,a))&&isFinite(i)?new f(i+"").e:g(a*(Math.log("0."+q(u.d))/Math.LN10+u.e+1)))>f.maxE+1||e<f.minE-1?new f(e>0?o/0:0):(c=!1,f.rounding=u.s=1,i=Math.min(12,(e+"").length),(t=C(n.times(H(u,r+i)),r)).d&&D((t=Z(t,r+5,1)).d,r,s)&&(e=r+10,+q((t=Z(C(n.times(H(u,e+i)),e),e+5,1)).d).slice(r+1,r+15)+1==1e14&&(t=Z(t,r+1,0))),t.s=o,c=!0,f.rounding=s,Z(t,r,s))},M.toPrecision=function(n,e){var i,t=this,s=t.constructor;return void 0===n?i=S(t,t.e<=s.toExpNeg||t.e>=s.toExpPos):(O(n,1,r),void 0===e?e=s.rounding:O(e,0,8),i=S(t=Z(new s(t),n,e),n<=t.e||t.e<=s.toExpNeg,n)),t.isNeg()&&!t.isZero()?"-"+i:i},M.toSignificantDigits=M.toSD=function(n,e){var i=this.constructor;return void 0===n?(n=i.precision,e=i.rounding):(O(n,1,r),void 0===e?e=i.rounding:O(e,0,8)),Z(new i(this),n,e)},M.toString=function(){var n=this,e=n.constructor,i=S(n,n.e<=e.toExpNeg||n.e>=e.toExpPos);return n.isNeg()&&!n.isZero()?"-"+i:i},M.truncated=M.trunc=function(){return Z(new this.constructor(this),this.e+1,1)},M.valueOf=M.toJSON=function(){var n=this,e=n.constructor,i=S(n,n.e<=e.toExpNeg||n.e>=e.toExpPos);return n.isNeg()?"-"+i:i};var A=function(){function e(n,e,i){var r,t=0,s=n.length;for(n=n.slice();s--;)r=n[s]*e+t,n[s]=r%i|0,t=r/i|0;return t&&n.unshift(t),n}function i(n,e,i,r){var t,s;if(i!=r)s=i>r?1:-1;else for(t=s=0;t<i;t++)if(n[t]!=e[t]){s=n[t]>e[t]?1:-1;break}return s}function r(n,e,i,r){for(var t=0;i--;)n[i]-=t,t=n[i]<e[i]?1:0,n[i]=t*r+n[i]-e[i];for(;!n[0]&&n.length>1;)n.shift();}return function(t,s,o,u,c,f){var a,h,l,d,p,m,w,v,N,x,y,M,q,O,D,F,A,S,P,R,T=t.constructor,_=t.s==s.s?1:-1,L=t.d,U=s.d;if(!(L&&L[0]&&U&&U[0]))return new T(t.s&&s.s&&(L?!U||L[0]!=U[0]:U)?L&&0==L[0]||!U?0*_:_/0:NaN);for(f?(p=1,h=t.e-s.e):(f=b,p=E,h=g(t.e/p)-g(s.e/p)),P=U.length,A=L.length,x=(N=new T(_)).d=[],l=0;U[l]==(L[l]||0);l++);if(U[l]>(L[l]||0)&&h--,null==o?(O=o=T.precision,u=T.rounding):O=c?o+(t.e-s.e)+1:o,O<0)x.push(1),m=!0;else {if(O=O/p+2|0,l=0,1==P){for(d=0,U=U[0],O++;(l<A||d)&&O--;l++)D=d*f+(L[l]||0),x[l]=D/U|0,d=D%U|0;m=d||l<A;}else {for((d=f/(U[0]+1)|0)>1&&(U=e(U,d,f),L=e(L,d,f),P=U.length,A=L.length),F=P,M=(y=L.slice(0,P)).length;M<P;)y[M++]=0;(R=U.slice()).unshift(0),S=U[0],U[1]>=f/2&&++S;do{d=0,(a=i(U,y,P,M))<0?(q=y[0],P!=M&&(q=q*f+(y[1]||0)),(d=q/S|0)>1?(d>=f&&(d=f-1),1==(a=i(w=e(U,d,f),y,v=w.length,M=y.length))&&(d--,r(w,P<v?R:U,v,f))):(0==d&&(a=d=1),w=U.slice()),(v=w.length)<M&&w.unshift(0),r(y,w,M,f),-1==a&&(a=i(U,y,P,M=y.length))<1&&(d++,r(y,P<M?R:U,M,f)),M=y.length):0===a&&(d++,y=[0]),x[l++]=d,a&&y[0]?y[M++]=L[F]||0:(y=[L[F]],M=1);}while((F++<A||void 0!==y[0])&&O--);m=void 0!==y[0];}x[0]||x.shift();}if(1==p)N.e=h,n=m;else {for(l=1,d=x[0];d>=10;d/=10)l++;N.e=l+h*p-1,Z(N,c?o+N.e+1:o,u,m);}return N}}();function Z(n,e,i,r){var t,s,o,u,f,a,h,l,d,g=n.constructor;n:if(null!=e){if(!(l=n.d))return n;for(t=1,u=l[0];u>=10;u/=10)t++;if((s=e-t)<0)s+=E,o=e,f=(h=l[d=0])/p(10,t-o-1)%10|0;else if((d=Math.ceil((s+1)/E))>=(u=l.length)){if(!r)break n;for(;u++<=d;)l.push(0);h=f=0,t=1,o=(s%=E)-E+1;}else {for(h=u=l[d],t=1;u>=10;u/=10)t++;f=(o=(s%=E)-E+t)<0?0:h/p(10,t-o-1)%10|0;}if(r=r||e<0||void 0!==l[d+1]||(o<0?h:h%p(10,t-o-1)),a=i<4?(f||r)&&(0==i||i==(n.s<0?3:2)):f>5||5==f&&(4==i||r||6==i&&(s>0?o>0?h/p(10,t-o):0:l[d-1])%10&1||i==(n.s<0?8:7)),e<1||!l[0])return l.length=0,a?(e-=n.e+1,l[0]=p(10,(E-e%E)%E),n.e=-e||0):l[0]=n.e=0,n;if(0==s?(l.length=d,u=1,d--):(l.length=d+1,u=p(10,E-s),l[d]=o>0?(h/p(10,t-o)%p(10,o)|0)*u:0),a)for(;;){if(0==d){for(s=1,o=l[0];o>=10;o/=10)s++;for(o=l[0]+=u,u=1;o>=10;o/=10)u++;s!=u&&(n.e++,l[0]==b&&(l[0]=1));break}if(l[d]+=u,l[d]!=b)break;l[d--]=0,u=1;}for(s=l.length;0===l[--s];)l.pop();}return c&&(n.e>g.maxE?(n.d=null,n.e=NaN):n.e<g.minE&&(n.e=0,n.d=[0])),n}function S(n,e,i){if(!n.isFinite())return B(n);var r,t=n.e,s=q(n.d),o=s.length;return e?(i&&(r=i-o)>0?s=s.charAt(0)+"."+s.slice(1)+L(r):o>1&&(s=s.charAt(0)+"."+s.slice(1)),s=s+(n.e<0?"e":"e+")+n.e):t<0?(s="0."+L(-t-1)+s,i&&(r=i-o)>0&&(s+=L(r))):t>=o?(s+=L(t+1-o),i&&(r=i-t-1)>0&&(s=s+"."+L(r))):((r=t+1)<o&&(s=s.slice(0,r)+"."+s.slice(r)),i&&(r=i-o)>0&&(t+1===o&&(s+="."),s+=L(r))),s}function P(n,e){var i=n[0];for(e*=E;i>=10;i/=10)e++;return e}function R(n,e,i){if(e>x)throw c=!0,i&&(n.precision=i),Error(h);return Z(new n(s),e,1,!0)}function T(n,e,i){if(e>y)throw Error(h);return Z(new n(o),e,i,!0)}function _(n){var e=n.length-1,i=e*E+1;if(e=n[e]){for(;e%10==0;e/=10)i--;for(e=n[0];e>=10;e/=10)i++;}return i}function L(n){for(var e="";n--;)e+="0";return e}function U(n,e,i,r){var t,s=new n(1),o=Math.ceil(r/E+4);for(c=!1;;){if(i%2&&G((s=s.times(e)).d,o)&&(t=!0),0===(i=g(i/2))){i=s.d.length-1,t&&0===s.d[i]&&++s.d[i];break}G((e=e.times(e)).d,o);}return c=!0,s}function k(n){return 1&n.d[n.d.length-1]}function I(n,e,i){for(var r,t=new n(e[0]),s=0;++s<e.length;){if(!(r=new n(e[s])).s){t=r;break}t[i](r)&&(t=r);}return t}function C(n,e){var i,r,t,s,o,u,f,a=0,h=0,l=0,d=n.constructor,g=d.rounding,m=d.precision;if(!n.d||!n.d[0]||n.e>17)return new d(n.d?n.d[0]?n.s<0?0:1/0:1:n.s?n.s<0?0:n:NaN);for(null==e?(c=!1,f=m):f=e,u=new d(.03125);n.e>-2;)n=n.times(u),l+=5;for(f+=r=Math.log(p(2,l))/Math.LN10*2+5|0,i=s=o=new d(1),d.precision=f;;){if(s=Z(s.times(n),f,1),i=i.times(++h),q((u=o.plus(A(s,i,f,1))).d).slice(0,f)===q(o.d).slice(0,f)){for(t=l;t--;)o=Z(o.times(o),f,1);if(null!=e)return d.precision=m,o;if(!(a<3&&D(o.d,f-r,g,a)))return Z(o,d.precision=m,g,c=!0);d.precision=f+=10,i=s=u=new d(1),h=0,a++;}o=u;}}function H(n,e){var i,r,t,s,o,u,f,a,h,l,d,g=1,p=n,m=p.d,w=p.constructor,v=w.rounding,N=w.precision;if(p.s<0||!m||!m[0]||!p.e&&1==m[0]&&1==m.length)return new w(m&&!m[0]?-1/0:1!=p.s?NaN:m?0:p);if(null==e?(c=!1,h=N):h=e,w.precision=h+=10,r=(i=q(m)).charAt(0),!(Math.abs(s=p.e)<15e14))return a=R(w,h+2,N).times(s+""),p=H(new w(r+"."+i.slice(1)),h-10).plus(a),w.precision=N,null==e?Z(p,N,v,c=!0):p;for(;r<7&&1!=r||1==r&&i.charAt(1)>3;)r=(i=q((p=p.times(n)).d)).charAt(0),g++;for(s=p.e,r>1?(p=new w("0."+i),s++):p=new w(r+"."+i.slice(1)),l=p,f=o=p=A(p.minus(1),p.plus(1),h,1),d=Z(p.times(p),h,1),t=3;;){if(o=Z(o.times(d),h,1),q((a=f.plus(A(o,new w(t),h,1))).d).slice(0,h)===q(f.d).slice(0,h)){if(f=f.times(2),0!==s&&(f=f.plus(R(w,h+2,N).times(s+""))),f=A(f,new w(g),h,1),null!=e)return w.precision=N,f;if(!D(f.d,h-10,v,u))return Z(f,w.precision=N,v,c=!0);w.precision=h+=10,a=o=p=A(l.minus(1),l.plus(1),h,1),d=Z(p.times(p),h,1),t=u=1;}f=a,t+=2;}}function B(n){return String(n.s*n.s/0)}function V(n,e){var i,r,t;for((i=e.indexOf("."))>-1&&(e=e.replace(".","")),(r=e.search(/e/i))>0?(i<0&&(i=r),i+=+e.slice(r+1),e=e.substring(0,r)):i<0&&(i=e.length),r=0;48===e.charCodeAt(r);r++);for(t=e.length;48===e.charCodeAt(t-1);--t);if(e=e.slice(r,t)){if(t-=r,n.e=i=i-r-1,n.d=[],r=(i+1)%E,i<0&&(r+=E),r<t){for(r&&n.d.push(+e.slice(0,r)),t-=E;r<t;)n.d.push(+e.slice(r,r+=E));e=e.slice(r),r=E-e.length;}else r-=t;for(;r--;)e+="0";n.d.push(+e),c&&(n.e>n.constructor.maxE?(n.d=null,n.e=NaN):n.e<n.constructor.minE&&(n.e=0,n.d=[0]));}else n.e=0,n.d=[0];return n}function $(n,e){var i,r,t,s,o,u,f,h,l;if(e.indexOf("_")>-1){if(e=e.replace(/(\d)_(?=\d)/g,"$1"),N.test(e))return V(n,e)}else if("Infinity"===e||"NaN"===e)return +e||(n.s=NaN),n.e=NaN,n.d=null,n;if(w.test(e))i=16,e=e.toLowerCase();else if(m.test(e))i=2;else {if(!v.test(e))throw Error(a+e);i=8;}for((s=e.search(/p/i))>0?(f=+e.slice(s+1),e=e.substring(2,s)):e=e.slice(2),o=(s=e.indexOf("."))>=0,r=n.constructor,o&&(s=(u=(e=e.replace(".","")).length)-s,t=U(r,new r(i),s,2*s)),s=l=(h=F(e,i,b)).length-1;0===h[s];--s)h.pop();return s<0?new r(0*n.s):(n.e=P(h,l),n.d=h,c=!1,o&&(n=A(n,t,4*u)),f&&(n=n.times(Math.abs(f)<54?p(2,f):Decimal.pow(2,f))),c=!0,n)}function j(n,e,i,r,t){var s,o,u,f,a=n.precision,h=Math.ceil(a/E);for(c=!1,f=i.times(i),u=new n(r);;){if(o=A(u.times(f),new n(e++*e++),a,1),u=t?r.plus(o):r.minus(o),r=A(o.times(f),new n(e++*e++),a,1),void 0!==(o=u.plus(r)).d[h]){for(s=h;o.d[s]===u.d[s]&&s--;);if(-1==s)break}s=u,u=r,r=o,o=s;}return c=!0,o.d.length=h+1,o}function W(n,e){for(var i=n;--e;)i*=n;return i}function J(n,i){var r,t=i.s<0,s=T(n,n.precision,1),o=s.times(.5);if((i=i.abs()).lte(o))return e=t?4:1,i;if((r=i.divToInt(s)).isZero())e=t?3:2;else {if((i=i.minus(r.times(s))).lte(o))return e=k(r)?t?2:3:t?4:1,i;e=k(r)?t?1:4:t?3:2;}return i.minus(s).abs()}function z(e,i,s,o){var u,c,f,a,h,l,d,g,p,m=e.constructor,w=void 0!==s;if(w?(O(s,1,r),void 0===o?o=m.rounding:O(o,0,8)):(s=m.precision,o=m.rounding),e.isFinite()){for(w?(u=2,16==i?s=4*s-3:8==i&&(s=3*s-2)):u=i,(f=(d=S(e)).indexOf("."))>=0&&(d=d.replace(".",""),(p=new m(1)).e=d.length-f,p.d=F(S(p),10,u),p.e=p.d.length),c=h=(g=F(d,10,u)).length;0==g[--h];)g.pop();if(g[0]){if(f<0?c--:((e=new m(e)).d=g,e.e=c,g=(e=A(e,p,s,o,0,u)).d,c=e.e,l=n),f=g[s],a=u/2,l=l||void 0!==g[s+1],l=o<4?(void 0!==f||l)&&(0===o||o===(e.s<0?3:2)):f>a||f===a&&(4===o||l||6===o&&1&g[s-1]||o===(e.s<0?8:7)),g.length=s,l)for(;++g[--s]>u-1;)g[s]=0,s||(++c,g.unshift(1));for(h=g.length;!g[h-1];--h);for(f=0,d="";f<h;f++)d+=t.charAt(g[f]);if(w){if(h>1)if(16==i||8==i){for(f=16==i?4:3,--h;h%f;h++)d+="0";for(h=(g=F(d,u,i)).length;!g[h-1];--h);for(f=1,d="1.";f<h;f++)d+=t.charAt(g[f]);}else d=d.charAt(0)+"."+d.slice(1);d=d+(c<0?"p":"p+")+c;}else if(c<0){for(;++c;)d="0"+d;d="0."+d;}else if(++c>h)for(c-=h;c--;)d+="0";else c<h&&(d=d.slice(0,c)+"."+d.slice(c));}else d=w?"0p+0":"0";d=(16==i?"0x":2==i?"0b":8==i?"0o":"")+d;}else d=B(e);return e.s<0?"-"+d:d}function G(n,e){if(n.length>e)return n.length=e,!0}function K(n){return new this(n).abs()}function Q(n){return new this(n).acos()}function X(n){return new this(n).acosh()}function Y(n,e){return new this(n).plus(e)}function nn(n){return new this(n).asin()}function en(n){return new this(n).asinh()}function rn(n){return new this(n).atan()}function tn(n){return new this(n).atanh()}function sn(n,e){n=new this(n),e=new this(e);var i,r=this.precision,t=this.rounding,s=r+4;return n.s&&e.s?n.d||e.d?!e.d||n.isZero()?(i=e.s<0?T(this,r,t):new this(0)).s=n.s:!n.d||e.isZero()?(i=T(this,s,1).times(.5)).s=n.s:e.s<0?(this.precision=s,this.rounding=1,i=this.atan(A(n,e,s,1)),e=T(this,s,1),this.precision=r,this.rounding=t,i=n.s<0?i.minus(e):i.plus(e)):i=this.atan(A(n,e,s,1)):(i=T(this,s,1).times(e.s>0?.25:.75)).s=n.s:i=new this(NaN),i}function on(n){return new this(n).cbrt()}function un(n){return Z(n=new this(n),n.e+1,2)}function cn(n,e,i){return new this(n).clamp(e,i)}function fn(n){if(!n||"object"!=typeof n)throw Error(f+"Object expected");var e,t,s,o=!0===n.defaults,c=["precision",1,r,"rounding",0,8,"toExpNeg",-i,0,"toExpPos",0,i,"maxE",0,i,"minE",-i,0,"modulo",0,9];for(e=0;e<c.length;e+=3)if(t=c[e],o&&(this[t]=u[t]),void 0!==(s=n[t])){if(!(g(s)===s&&s>=c[e+1]&&s<=c[e+2]))throw Error(a+t+": "+s);this[t]=s;}if(t="crypto",o&&(this[t]=u[t]),void 0!==(s=n[t])){if(!0!==s&&!1!==s&&0!==s&&1!==s)throw Error(a+t+": "+s);if(s){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw Error(l);this[t]=!0;}else this[t]=!1;}return this}function an(n){return new this(n).cos()}function hn(n){return new this(n).cosh()}function ln(n,e){return new this(n).div(e)}function dn(n){return new this(n).exp()}function gn(n){return Z(n=new this(n),n.e+1,3)}function pn(){var n,e,i=new this(0);for(c=!1,n=0;n<arguments.length;)if((e=new this(arguments[n++])).d)i.d&&(i=i.plus(e.times(e)));else {if(e.s)return c=!0,new this(1/0);i=e;}return c=!0,i.sqrt()}function mn(n){return n instanceof Decimal||n&&n.toStringTag===d||!1}function wn(n){return new this(n).ln()}function vn(n,e){return new this(n).log(e)}function Nn(n){return new this(n).log(2)}function bn(n){return new this(n).log(10)}function En(){return I(this,arguments,"lt")}function xn(){return I(this,arguments,"gt")}function yn(n,e){return new this(n).mod(e)}function Mn(n,e){return new this(n).mul(e)}function qn(n,e){return new this(n).pow(e)}function On(n){var e,i,t,s,o=0,u=new this(1),c=[];if(void 0===n?n=this.precision:O(n,1,r),t=Math.ceil(n/E),this.crypto)if(crypto.getRandomValues)for(e=crypto.getRandomValues(new Uint32Array(t));o<t;)(s=e[o])>=429e7?e[o]=crypto.getRandomValues(new Uint32Array(1))[0]:c[o++]=s%1e7;else {if(!crypto.randomBytes)throw Error(l);for(e=crypto.randomBytes(t*=4);o<t;)(s=e[o]+(e[o+1]<<8)+(e[o+2]<<16)+((127&e[o+3])<<24))>=214e7?crypto.randomBytes(4).copy(e,o):(c.push(s%1e7),o+=4);o=t/4;}else for(;o<t;)c[o++]=1e7*Math.random()|0;for(t=c[--o],n%=E,t&&n&&(s=p(10,E-n),c[o]=(t/s|0)*s);0===c[o];o--)c.pop();if(o<0)i=0,c=[0];else {for(i=-1;0===c[0];i-=E)c.shift();for(t=1,s=c[0];s>=10;s/=10)t++;t<E&&(i-=E-t);}return u.e=i,u.d=c,u}function Dn(n){return Z(n=new this(n),n.e+1,this.rounding)}function Fn(n){return (n=new this(n)).d?n.d[0]?n.s:0*n.s:n.s||NaN}function An(n){return new this(n).sin()}function Zn(n){return new this(n).sinh()}function Sn(n){return new this(n).sqrt()}function Pn(n,e){return new this(n).sub(e)}function Rn(){var n=0,e=arguments,i=new this(e[n]);for(c=!1;i.s&&++n<e.length;)i=i.plus(e[n]);return c=!0,Z(i,this.precision,this.rounding)}function Tn(n){return new this(n).tan()}function _n(n){return new this(n).tanh()}function Ln(n){return Z(n=new this(n),n.e+1,1)}M[Symbol.for("nodejs.util.inspect.custom")]=M.toString,M[Symbol.toStringTag]="Decimal";var Decimal=M.constructor=function n(e){var i,r,t;function s(n){var e,i,r,t=this;if(!(t instanceof s))return new s(n);if(t.constructor=s,mn(n))return t.s=n.s,void(c?!n.d||n.e>s.maxE?(t.e=NaN,t.d=null):n.e<s.minE?(t.e=0,t.d=[0]):(t.e=n.e,t.d=n.d.slice()):(t.e=n.e,t.d=n.d?n.d.slice():n.d));if("number"===(r=typeof n)){if(0===n)return t.s=1/n<0?-1:1,t.e=0,void(t.d=[0]);if(n<0?(n=-n,t.s=-1):t.s=1,n===~~n&&n<1e7){for(e=0,i=n;i>=10;i/=10)e++;return void(c?e>s.maxE?(t.e=NaN,t.d=null):e<s.minE?(t.e=0,t.d=[0]):(t.e=e,t.d=[n]):(t.e=e,t.d=[n]))}return 0*n!=0?(n||(t.s=NaN),t.e=NaN,void(t.d=null)):V(t,n.toString())}if("string"!==r)throw Error(a+n);return 45===(i=n.charCodeAt(0))?(n=n.slice(1),t.s=-1):(43===i&&(n=n.slice(1)),t.s=1),N.test(n)?V(t,n):$(t,n)}if(s.prototype=M,s.ROUND_UP=0,s.ROUND_DOWN=1,s.ROUND_CEIL=2,s.ROUND_FLOOR=3,s.ROUND_HALF_UP=4,s.ROUND_HALF_DOWN=5,s.ROUND_HALF_EVEN=6,s.ROUND_HALF_CEIL=7,s.ROUND_HALF_FLOOR=8,s.EUCLID=9,s.config=s.set=fn,s.clone=n,s.isDecimal=mn,s.abs=K,s.acos=Q,s.acosh=X,s.add=Y,s.asin=nn,s.asinh=en,s.atan=rn,s.atanh=tn,s.atan2=sn,s.cbrt=on,s.ceil=un,s.clamp=cn,s.cos=an,s.cosh=hn,s.div=ln,s.exp=dn,s.floor=gn,s.hypot=pn,s.ln=wn,s.log=vn,s.log10=bn,s.log2=Nn,s.max=En,s.min=xn,s.mod=yn,s.mul=Mn,s.pow=qn,s.random=On,s.round=Dn,s.sign=Fn,s.sin=An,s.sinh=Zn,s.sqrt=Sn,s.sub=Pn,s.sum=Rn,s.tan=Tn,s.tanh=_n,s.trunc=Ln,void 0===e&&(e={}),e&&!0!==e.defaults)for(t=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],i=0;i<t.length;)e.hasOwnProperty(r=t[i++])||(e[r]=this[r]);return s.config(e),s}(u);s=new Decimal(s),o=new Decimal(o);

const langKey = document.documentElement.lang.match("(en|fr)") ? document.documentElement.lang : "en";
const langData = {
    en: {
        "unit.any.name": "Not Important",
        "unit.watt.name": "Watt",
        "unit.ampere.name": "Ampere",
        "unit.ohm.name": "Ohm",
        "unit.ohm.desc": "Electrical Resistance",
        "unit.volt.name": "Volt",
        "unit.farad.name": "Farad",
        "error.formulaValue.noParent": "Attempting to get a formula's value whose parent formula isn't set !",
        "error.formulaValue.noSource": "Attempting to get a formula's value whose value source is null !",
        "error.formulaContext.tooSmall": "The current calculation context is too small !",
        "ui.formulaCount": "formulas",
        "formula.ohm_law.name": "Ohm's Law",
        "dataset.resistor-e3.name": "E3 IEC Resistors",
        "dataset.resistor-e3.desc": "???",
        "dataset.resistor-e6.name": "E6 IEC Resistors",
        "dataset.resistor-e6.desc": "???",
        "dataset.resistor-e12.name": "E12 IEC Resistors",
        "dataset.resistor-e12.desc": "???",
        "dataset.resistor-e24.name": "E24 IEC Resistors",
        "dataset.resistor-e24.desc": "???",
        "dataset.resistor-e48.name": "E48 IEC Resistors",
        "dataset.resistor-e48.desc": "???",
        "dataset.capacitor-iec.name": "IEC E24 Capacitors",
        "dataset.capacitor-iec.desc": "???",
        "context.type.disabled.name": "Disabled",
        "context.type.constant.name": "Constant",
        "context.type.continuous.name": "Continuous",
        "context.type.valueRange.name": "Value Range",
        "context.type.dataSetRange.name": "Set-based Range",
        "context.type.disabled.desc": "???",
        "context.type.constant.desc": "???",
        "context.type.continuous.desc": "???",
        "context.type.valueRange.desc": "???",
        "context.type.dataSetRange.desc": "???",
    },
    fr: {
        "unit.ampere.name": "Ampère",
        "unit.ohm.desc": "Résistance électrique",
        "_error.formulaValue.noParent": "",
        "_error.formulaValue.noSource": "",
        "ui.formulaCount": "formules",
        "formula.ohm_law.name": "Loi d'Ohm",
        "context.type.disabled.name": "Désactivé",
        "context.type.constant.name": "Constante",
        "context.type.continuous.name": "Continue",
        "context.type.valueRange.name": "Valeurs distinctes",
        "context.type.dataSetRange.name": "Set de valeurs",
    }
};
function localize(stringKey) {
    let _langData = langKey in langData ? langData[langKey] : langData.en;
    return stringKey in _langData ? _langData[stringKey] : (stringKey in langData["en"] ? langData["en"][stringKey] : stringKey);
}

class Unit {
    constructor(unitKey, symbol, scale) {
        this.name = localize("unit." + unitKey + ".name");
        this.symbol = symbol;
        this.scale = scale;
        this.description = localize("unit." + unitKey + ".desc");
    }
}
const scales = {
    SI: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    IMPERIAL_DISTANCE: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    IMPERIAL_WEIGHT: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    TIME_SECONDS: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    NONE: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.name;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
};
const scaleFactors = {
    SI_GIGA: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e9');
            this.prefix = "giga";
            this.suffix = "";
            this.symbol = "G";
        }
    },
    SI_MEGA: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e6');
            this.prefix = "mega";
            this.suffix = "";
            this.symbol = "M";
        }
    },
    SI_KILO: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e3');
            this.prefix = "kilo";
            this.suffix = "";
            this.symbol = "k";
        }
    },
    SI_BASE: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    SI_CENTI: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e-2');
            this.prefix = "centi";
            this.suffix = "";
            this.symbol = "c";
        }
    },
    SI_MILLI: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e-3');
            this.prefix = "milli";
            this.suffix = "";
            this.symbol = "m";
        }
    },
    TIME_MILLI: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('1e-3');
            this.prefix = "milli";
            this.suffix = "";
            this.symbol = "m";
        }
    },
    TIME_BASE: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('1');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    TIME_MINUTE: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('60');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    TIME_HOUR: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('3600');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    TIME_DAY: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('86400');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
};
const units = {
    ANY: new Unit("any", "", scales.NONE),
    WATT: new Unit("watt", "W", scales.SI),
    VOLT: new Unit("volt", "V", scales.SI),
    AMPERE: new Unit("ampere", "A", scales.SI),
    OHM: new Unit("ohm", "Ω", scales.SI),
    FARAD: new Unit("farad", "F", scales.SI),
    METER: new Unit("meter", "m", scales.SI),
    INCH: new Unit("inch", "in", scales.IMPERIAL_DISTANCE),
    POUND: new Unit("pound", "p", scales.IMPERIAL_WEIGHT),
};
function scaleToBase(value, scaleFactor) {
    return value.times(scaleFactor.multiplier);
}
function scaleFromBase(value, scaleFactor) {
    return value.dividedBy(scaleFactor.multiplier);
}
let areUnitsInitialized = false;
function initUnits() {
    if (!areUnitsInitialized) {
        console.debug("Initializing scales & units...");
        Object.keys(scaleFactors).forEach(scaleFactorKey => {
            const scaleFactor = scaleFactors[scaleFactorKey];
            scaleFactor.scale.scaleFactors.push(scaleFactor);
        });
        areUnitsInitialized = true;
    }
}

class FormulaContextHandler {
    constructor(contextValueIndex) {
        this.contextValueIndex = contextValueIndex;
    }
    getContextValue(context) {
        if (context.length <= this.contextValueIndex) {
            alert(localize("error.formulaContext.tooSmall"));
            throw new Error(localize("error.formulaContext.tooSmall"));
        }
        return context[this.contextValueIndex];
    }
}
class FormulaValue {
    constructor(unit, scaleFactor) {
        this.unit = unit;
        this.scaleFactor = scaleFactor;
        this.parentFormula = null;
        this.valueSource = null;
    }
    getFormulaValue(context) {
        if (this.parentFormula === null) {
            alert(localize("error.formulaValue.noParent"));
            throw new Error(localize("error.formulaValue.noParent"));
        }
        if (this.valueSource === null) {
            alert(localize("error.formulaValue.noSource"));
            throw new Error(localize("error.formulaValue.noSource"));
        }
        if (this.valueSource instanceof FormulaContextHandler) {
            return this.valueSource.getContextValue(context);
        }
        return scaleFromBase(scaleToBase(this.valueSource.getVariantValue(this.parentFormula, context), this.valueSource.getOutputValueDefinition().scaleFactor), this.scaleFactor);
    }
}
class Formula {
    constructor(values, variants, formulaKey, categories, wikiLink) {
        this.values = values;
        this.variants = variants;
        this.formulaKey = formulaKey;
        this.name = localize("formula." + formulaKey + ".name");
        this.description = localize("formula." + formulaKey + ".desc");
        this.categories = categories;
        this.wikiLink = wikiLink;
        this.values.forEach(value => {
            value.parentFormula = this;
        });
    }
    getClone() {
        const clonedFormulaValues = [];
        this.values.forEach(originalValue => {
            clonedFormulaValues.push(new FormulaValue(originalValue.unit, originalValue.scaleFactor));
        });
        return new Formula(clonedFormulaValues, this.variants, this.formulaKey, this.categories, this.wikiLink);
    }
}
const formulas = {
    OHM_LAW: new Formula([
        new FormulaValue(units.OHM, scaleFactors.SI_BASE),
        new FormulaValue(units.AMPERE, scaleFactors.SI_BASE),
        new FormulaValue(units.VOLT, scaleFactors.SI_BASE),
    ], [
        new class {
            constructor() {
                this.description = "V=I*R";
                this.getVariantValue = (formula, context) => {
                    return formula.values[0].getFormulaValue(context).times(formula.values[1].getFormulaValue(context));
                };
                this.getInputValuesDefinition = () => {
                    return [this.parentFormula.values[0], this.parentFormula.values[1]];
                };
                this.getOutputValueDefinition = () => {
                    return this.parentFormula.values[2];
                };
                this.getMathMl = (formula) => {
                    return "<math><mi>" +
                        formula.values[2].unit.symbol +
                        "</mi><mo>=</mo><mi>" +
                        formula.values[0].unit.symbol +
                        "</mi><mo>*</mo><mi>" +
                        formula.values[1].unit.symbol +
                        "</mi></math>";
                };
                this.parentFormula = null;
            }
        },
        new class {
            constructor() {
                this.description = "I=V/R";
                this.getVariantValue = (formula, context) => {
                    return formula.values[2].getFormulaValue(context).dividedBy(formula.values[0].getFormulaValue(context));
                };
                this.getInputValuesDefinition = () => {
                    return [this.parentFormula.values[0], this.parentFormula.values[2]];
                };
                this.getOutputValueDefinition = () => {
                    return this.parentFormula.values[1];
                };
                this.getMathMl = (formula) => {
                    return "<math><mi>" +
                        formula.values[1].unit.symbol +
                        "</mi><mo>=</mo><mfrac><mi>" +
                        formula.values[2].unit.symbol +
                        "</mi><mi>" +
                        formula.values[0].unit.symbol +
                        "</mi></mfrac></math>";
                };
                this.parentFormula = null;
            }
        },
        new class {
            constructor() {
                this.description = "R=V/I";
                this.getVariantValue = (formula, context) => {
                    return formula.values[2].getFormulaValue(context).dividedBy(formula.values[1].getFormulaValue(context));
                };
                this.getInputValuesDefinition = () => {
                    return [this.parentFormula.values[2], this.parentFormula.values[1]];
                };
                this.getOutputValueDefinition = () => {
                    return this.parentFormula.values[0];
                };
                this.getMathMl = (formula) => {
                    return "<math><mi>" +
                        formula.values[0].unit.symbol +
                        "</mi><mo>=</mo><mfrac><mi>" +
                        formula.values[2].unit.symbol +
                        "</mi><mi>" +
                        formula.values[1].unit.symbol +
                        "</mi></mfrac></math>";
                };
                this.parentFormula = null;
            }
        },
    ], "ohm_law", ["electricity"], new URL("https://wikipedia.org/wiki/Ohm's_law")),
};
let areFormulasInitialized = false;
function initFormulas() {
    if (!areFormulasInitialized) {
        console.debug("Initializing formulas...");
        Object.keys(formulas).forEach(formulaKey => {
            formulas[formulaKey].variants.forEach(formulaVariant => {
                formulaVariant.parentFormula = formulas[formulaKey];
            });
        });
        areFormulasInitialized = true;
    }
}

/*!
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */
const idCatalogPrefix = "fw-catalog-";
const idCatalogCategoryPrefix = idCatalogPrefix + "category-";
const idCatalogCategoryCount = idCatalogPrefix + "formula-count";
const eCategoryContainers = {};
let IsCatalogInitialized = false;
function initCatalog() {
    if (!IsCatalogInitialized) {
        console.debug("Populating formula catalog...");
        document.querySelectorAll('[id]').forEach((element) => {
            if (element.id.startsWith(idCatalogCategoryPrefix)) {
                eCategoryContainers[element.id.replace(idCatalogCategoryPrefix, "")] = element;
            }
        });
        const eFormulaCount = document.getElementById(idCatalogCategoryCount);
        if (eFormulaCount !== null) {
            eFormulaCount.innerText = Object.keys(formulas).length.toString();
        }
        let eTemplateFormula = document.getElementById("template-formula-available");
        let eTemplateFormulaVariant = document.getElementById("template-formula-available-variant");
        if (eTemplateFormula === null || eTemplateFormulaVariant === null) {
            alert("error.ui.catalog.noTemplate");
            throw Error("error.ui.catalog.noTemplate");
        }
        Object.keys(formulas).forEach(formulaKey => {
            const hasValidCategory = formulas[formulaKey].categories.every(function (categoryId) {
                return Object.keys(eCategoryContainers).indexOf(categoryId) !== -1;
            });
            if (hasValidCategory) {
                let eNewFormula = eTemplateFormula.content.cloneNode(true);
                let eNewFormulaTitle = eNewFormula.querySelector("p");
                if (eNewFormulaTitle !== null) {
                    eNewFormulaTitle.innerText = formulas[formulaKey].name;
                }
                let eNewFormulaVariants = eNewFormula.querySelector("div.fw-variants");
                if (eNewFormulaVariants === null) {
                    alert("");
                    throw Error("");
                }
                eNewFormulaVariants.innerHTML = "";
                formulas[formulaKey].variants.forEach(variant => {
                    let eNewFormulaVariant = eTemplateFormulaVariant.content.cloneNode(true);
                    let eNewFormulaVariantButton = eNewFormulaVariant.querySelector("button");
                    if (eNewFormulaVariantButton === null) {
                        alert("");
                        throw Error("");
                    }
                    eNewFormulaVariantButton.innerHTML = variant.getMathMl(formulas[formulaKey]);
                    eNewFormulaVariantButton.title = variant.description;
                    eNewFormulaVariants.appendChild(eNewFormulaVariant);
                });
                formulas[formulaKey].categories.forEach(categoryKey => {
                    if (Object.keys(eCategoryContainers).includes(categoryKey)) {
                        eCategoryContainers[categoryKey].appendChild(eNewFormula);
                    }
                });
            }
        });
        IsCatalogInitialized = true;
    }
}

class DataSet {
    constructor(name, description, values, unit, scaleFactor) {
        this.name = name;
        this.description = description;
        this.values = values;
        this.unit = unit;
        this.scaleFactor = scaleFactor;
        if (unit.scale != scaleFactor.scale) {
            alert("");
            throw Error("");
        }
    }
    getDataSet() {
        return this.values;
    }
}
const e3Range = [1, 2.2, 4.7];
const e6Range = [1, 1.5, 2.2, 3.3, 4.7, 6.8];
const e12Range = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
const e24Range = [
    1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1
];
const e48Range = [
    1, 1.05, 1.1, 1.15, 1.21, 1.27, 1.33, 1.4, 1.47, 1.54, 1.62, 1.69, 1.78, 1.87, 1.96, 2.05, 2.15, 2.26, 2.37, 2.49,
    2.61, 2.74, 2.87, 3.01, 3.16, 3.32, 3.48, 3.65, 3.83, 4.02, 4.22, 4.42, 4.64, 4.87, 5.11, 5.36, 5.62, 5.9, 6.19,
    6.49, 6.81, 7.15, 7.5, 7.87, 8.25, 8.66, 9.09, 9.53
];
const resistorsScales = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
const capacitorScales = [10e-12, 10e-11, 10e-10, 10e-9, 10e-8, 10e-7, 10e-6, 10e-5, 10e-4, 10e-3, 10e-2];
const sets = {
    RESISTOR_E3: new DataSet(localize("dataset.resistor-e3.name"), localize("dataset.resistor-e3.desc"), resistorsScales.flatMap((e3Scale) => e3Range.map((e3Multiplier) => new Decimal(e3Scale).times(e3Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E6: new DataSet(localize("dataset.resistor-e6.name"), localize("dataset.resistor-e6.desc"), resistorsScales.flatMap((e6Scale) => e6Range.map((e6Multiplier) => new Decimal(e6Scale).times(e6Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E12: new DataSet(localize("dataset.resistor-e12.name"), localize("dataset.resistor-e12.desc"), resistorsScales.flatMap((e12Scale) => e12Range.map((e12Multiplier) => new Decimal(e12Scale).times(e12Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E24: new DataSet(localize("dataset.resistor-e24.name"), localize("dataset.resistor-e24.desc"), resistorsScales.flatMap((e24Scale) => e24Range.map((e24Multiplier) => new Decimal(e24Scale).times(e24Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E48: new DataSet(localize("dataset.resistor-e48.name"), localize("dataset.resistor-e48.desc"), resistorsScales.flatMap((e48Scale) => e48Range.map((e48Multiplier) => new Decimal(e48Scale).times(e48Multiplier))), units.OHM, scaleFactors.SI_BASE),
    CAPACITOR_IEC: new DataSet(localize("dataset.capacitor-iec.name"), localize("dataset.capacitor-iec.desc"), capacitorScales.flatMap((cScale) => e24Range.map((eMultiplier) => new Decimal(cScale).times(eMultiplier))), units.FARAD, scaleFactors.SI_BASE),
};

/*!
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */
class ContextType {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}
const contextTypes = {
    DISABLED: new ContextType(localize("context.type.disabled.name"), localize("context.type.disabled.desc")),
    CONSTANT: new ContextType(localize("context.type.constant.name"), localize("context.type.constant.desc")),
    CONTINUOUS: new ContextType(localize("context.type.continuous.name"), localize("context.type.continuous.desc")),
    VALUE_RANGE: new ContextType(localize("context.type.valueRange.name"), localize("context.type.valueRange.desc")),
    DATASET_RANG: new ContextType(localize("context.type.dataSetRange.name"), localize("context.type.dataSetRange.desc")),
};
const idContextComponentPrefix = "fw-context-component-";
const idContextComponentTypes = idContextComponentPrefix + "type";
const idContextComponentSets = idContextComponentPrefix + "set";
const idContextComponentUnit = idContextComponentPrefix + "unit";
const idContextComponentScale = idContextComponentPrefix + "scale";
let eTemplateContextComponent = null;
let eContextStatusMessage = null;
let eContextAddButton = null;
let isWorkbenchContextSetup = false;
function setupWorkbenchContext() {
    if (!isWorkbenchContextSetup) {
        console.debug("Preparing UI for workbench context components...");
        eTemplateContextComponent = document.getElementById("template-context-component");
        if (eTemplateContextComponent === null) {
            alert(localize("error.ui.context.noTemplate"));
            throw Error(localize("error.ui.context.noTemplate"));
        }
        eTemplateContextComponent = eTemplateContextComponent.cloneNode(true).content;
        document.getElementById("template-context-component").remove();
        const eContextTypes = eTemplateContextComponent.getElementById(idContextComponentTypes);
        const eContextSets = eTemplateContextComponent.getElementById(idContextComponentSets);
        const eContextUnits = eTemplateContextComponent.getElementById(idContextComponentUnit);
        const eContextScales = eTemplateContextComponent.getElementById(idContextComponentScale);
        if ([eContextTypes, eContextSets, eContextUnits, eContextScales].some((item) => item === null)) {
            alert(localize("error.ui.context.noSets"));
            throw Error(localize("error.ui.context.noSets"));
        }
        Object.keys(contextTypes).forEach(value => {
            const eNewContextTypesOption = document.createElement("option");
            eNewContextTypesOption.setAttribute("value", value);
            eNewContextTypesOption.innerText = contextTypes[value].name;
            eContextTypes.appendChild(eNewContextTypesOption);
        });
        Object.keys(sets).forEach(value => {
            const eNewContextSetsOption = document.createElement("option");
            eNewContextSetsOption.setAttribute("value", value);
            eNewContextSetsOption.innerText = sets[value].name;
            eContextSets.appendChild(eNewContextSetsOption);
        });
        Object.keys(units).forEach(unitKey => {
            const eNewContextUnitsOption = document.createElement("option");
            eNewContextUnitsOption.setAttribute("value", unitKey);
            eNewContextUnitsOption.innerText = units[unitKey].name;
            eContextUnits.appendChild(eNewContextUnitsOption);
        });
        Object.keys(scaleFactors).forEach(scaleKey => {
            const eNewContextScalesOption = document.createElement("option");
            eNewContextScalesOption.setAttribute("value", scaleKey);
            eNewContextScalesOption.innerText = scaleFactors[scaleKey].prefix;
            eContextScales.appendChild(eNewContextScalesOption);
        });
        eContextStatusMessage = document.getElementById("fw-text-context-middle");
        if (eContextStatusMessage === null) {
            alert(localize("error.ui.context.noStatus"));
            throw Error(localize("error.ui.context.noStatus"));
        }
        eContextAddButton = document.querySelector("button#fw-button-add-context");
        if (eContextAddButton === null) {
            alert(localize("error.ui.context.missingButton"));
            throw Error(localize("error.ui.context.missingButton"));
        }
        eContextAddButton.onclick = function () {
            const eNewContextComponent = eTemplateContextComponent.cloneNode(true).firstElementChild;
            if (eNewContextComponent === null) {
                alert(localize("error.ui.context.component.cannotGetElement"));
                throw Error(localize("error.ui.context.component.cannotGetElement"));
            }
        };
        isWorkbenchContextSetup = true;
    }
}

/*!
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */
const version = [0, 0, 2];
console.log("Initializing 'Formula Wizard v" + version.join(".") + "'...");
new Date().getMilliseconds();
Decimal.set({ precision: 25, rounding: 8 });
initUnits();
initFormulas();
initCatalog();
setupWorkbenchContext();
console.log(localize("joe.mama"));
console.log(units);
console.log(formulas);
//# sourceMappingURL=formula-wizard.js.map
