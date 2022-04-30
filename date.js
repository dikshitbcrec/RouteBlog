module.exports=getdate;
function getdate(){
    var option={
        weekday:'long',
        day:'numeric',
        month:'long',
        year: 'numeric'
    };
    var today= new Date();
    var day=today.toLocaleDateString("en-US",option);
    return day.toString();
    }