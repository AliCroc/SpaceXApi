// export class consoleMsg {
//   private static active: boolean = true;
//   public static write(text: any) {
//     if (this.active == false) {
//       return;
//     }
//     else {
//       console.log(text);
//     }
//   }
// }
const debug = true;

export const log = function () {
  if (debug == true) {
    var args = Array.from(arguments);
    console.log.apply(console, args);
  }
}