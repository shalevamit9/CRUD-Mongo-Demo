import { expect } from "chai";
import { sum, multiply } from "../src/calc";


describe('The calc module',  ()=> {

    context(`#sum`,()=> {
        
        it(`should exist`,()=> {
            expect(sum).to.be.a('function')
            expect(sum).to.be.instanceOf(Function)
        })

        it(`should sum two numbers`,()=> {
            let actual = sum(2,3);
            expect(actual).to.equal(5)
        })

        it(`should sum several numbers`,()=> {
            let actual = sum(2,3,4,5,6);
            expect(actual).to.equal(20)
        })

    })

    context(`#multiply`,()=> {

        it(`should exist`,()=> {
            expect(sum).to.be.a('function')
            expect(sum).to.be.instanceOf(Function)
        })

        it(`should multiply two numbers`,()=> {
            let actual = multiply(2,3);
            expect(actual).to.eql([6])
        })

        it(`should muliply several numbers`,()=> {
            let actual = multiply(2,3,4,5,6);
            expect(actual).to.eql([6,8,10,12])
        })

    })
    
    // it('should return an array of resolved values', async ()=> {
    //     const promise1 = echo("first", 30);
    //     const promise2 = echo("second", 30);
    //     const promise3 = echo("third", 30);

    //     let actual = await all([ promise1, promise2, promise3 ]);
            
            
    //         expect(actual).to.eql(['first','second','third'])
    
    //     });


});

