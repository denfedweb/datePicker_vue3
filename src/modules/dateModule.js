export default function (){
  Date.prototype.getWeek = function() {
    let onejan = new Date(this.getFullYear(),0,1);
    let today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
    let dayOfYear = ((today - onejan + 86400000)/86400000);
    return Math.ceil(dayOfYear/7)
  }
  Date.prototype.addDays = function(days) {
    let dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
  }
}