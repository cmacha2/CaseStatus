export default function validate(caseNum){
    let errors = {}
    const pattern = new RegExp('^[A-Z]+$', 'i');
    const threeDigits = caseNum.slice(0,3) 
    if(!pattern.test(threeDigits)){
     errors.threeDigits = 'Must start with 3 letters'
    }
    if(caseNum.length !== 13){
        errors.size = 'Must be 13 digits'
    }
    return {errors}
}