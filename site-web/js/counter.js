const teamCounterSpan = D.querySelector("#team-count");
const customerCounterSpan = D.querySelector("#customer-count");
const reviewCounterSpan = D.querySelector("#review-count");


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

counter(teamCounterSpan, 24, 100);
counter(customerCounterSpan, 231, 40);
counter(reviewCounterSpan, 179, 50);

// data-pid="ChIJJWdrbCS5G2IRcPIcF728cww"