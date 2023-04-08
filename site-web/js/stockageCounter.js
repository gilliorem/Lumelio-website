const kwhCounterSpan = D.querySelector("#kwh-count");
const carChargeCounterSpan = D.querySelector("#car-charge-count");
const savingsCounterSpan = D.querySelector("#savings-count");


function counter(element, targetValue, timing)
{
    let count =0;
    const options = 
    {
        root:null,
        rootMargin:'-10px',
        threshold:.5
    };
    const obsverver = new IntersectionObserver(function(entries)
    {
        if (entries[0].isIntersecting)
        {
            const timer = setInterval(()=>
            {
                count ++;
                element.innerText = count;
                if(count >= targetValue)
                {
                    clearInterval(timer);
                }
            }, timing);
            obsverver.disconnect();
        }
    }, options);
    obsverver.observe(element);
}
counter(carChargeCounterSpan, 531, 10);
counter(savingsCounterSpan, 1289, 5);

// data-pid="ChIJJWdrbCS5G2IRcPIcF728cww"