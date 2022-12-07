
// export const selectImageUrls = (status) => {
//     My Case Was Received   <FontAwesomeIcon icon="fa-duotone fa-inbox-in" />
// My Case Accepted By The USCIS Lockbox   <FontAwesomeIcon icon="fa-regular fa-mailbox" />
// My Fingerprint Fee Was Received     <FontAwesomeIcon icon="fa-thin fa-fingerprint" />
// My Case Was Updated To Show Fingerprints Were Taken     <FontAwesomeIcon icon="fa-regular fa-fingerprint" />
// My Request for Additional Evidence Was Sent <FontAwesomeIcon icon="fa-light fa-folder-open" />
// My Request for Additional Evidence Was Received  <FontAwesomeIcon icon="fa-regular fa-folder-open" />
// My Case is Being Actively Reviewed  <FontAwesomeIcon icon="fa-light fa-magnifying-glass" />
// My Case Is On Hold   <FontAwesomeIcon icon="fa-regular fa-clock" />
// My Case is Ready to Be Scheduled for An Interview  <FontAwesomeIcon icon="fa-thin fa-user-police" />
// My Case is Scheduled for An interview <FontAwesomeIcon icon="fa-duotone fa-user-police-tie" />
// My Case Was Submitted For Quality Review Based On An Approval Recommendation <FontAwesomeIcon icon="fa-thin fa-money-check-pen" />
// My Case Was Approved <FontAwesomeIcon icon="fa-regular fa-face-smile" />
// My Card Was Mailed To Me <FontAwesomeIcon icon="fa-light fa-envelopes-bulk" />
// My Card Was Picked Up By The United States Postal Service <FontAwesomeIcon icon="fa-brands fa-usps" />
// My Card Was Delivered To Me By The Post Office <FontAwesomeIcon icon="fa-regular fa-envelope-circle-check" />
// My Case Was Sent To The Department of State <FontAwesomeIcon icon="fa-regular fa-flag-usa" />
// My Certificate Of Naturalization Was Issued  <FontAwesomeIcon icon="fa-light fa-file-certificate" />

//     switch (status) {
//         case "My Case Was Received":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665967988/6491423_rsjpx0.png"
//         case "My Case Accepted By The USCIS Lockbox":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968057/4248324_zugimo.png"
//         case "My Fingerprint Fee Was Received":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968116/1611179_lcrrvl.png"
//         case "My Case Was Updated To Show Fingerprints Were Taken":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968180/2313187_juzhr7.png"
//         case "My Request for Additional Evidence Was Sent":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968272/2439100_e4faez.png"
//         case "My Request for Additional Evidence Was Received":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968383/2822676_vbjd0a.png"
//         case "My Case is Being Actively Reviewed":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968436/3207514_hifwoq.png"
//         case "My Case Is On Hold":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968466/5261103_nku4zy.png"
//         case "My Case is Ready to Be Scheduled for An Interview":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968585/3222637_m1jgoe.png"
//         case "My Case is Scheduled for An interview":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968644/850331_jwpjoq.png"
//         case "My Case Was Submitted For Quality Review Based On An Approval Recommendation":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968687/2191108_t4tx6z.png"
//         case "My Case Was Approved":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968727/477571_jvnfoi.png"
//         case "My Card Was Mailed To Me":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968800/3143102_oecdoa.png"
//         case "My Card Was Picked Up By The United States Postal Service":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968869/5952209_goa5jo.png"
//         case "My Card Was Delivered To Me By The Post Office":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665968928/3269497_e9adle.png"
//         case "My Case Was Sent To The Department of State":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665969103/927364_bmswq5.png"
//         case "My Certificate Of Naturalization Was Issued":
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665969043/2912761_ic3eoo.png"
//         default:
//             return "https://res.cloudinary.com/cmacha2/image/upload/v1665969129/25643_bcjkm5.png"

//     }
// };


export const colorSelect = (status) => {

    const one = ["Delivered","Mailed","Ready","Accepted","Post Office","Picked Up","Produced"]
    const two = ["Fee","Fingerprints"]
    const three = ["Evidence","Request"]
    const four = ["Actively","Review","Hold","Reviewed","Received"]
    const five = ["Interview","Sheduled"]
    const six = ["Denied"]
    
    if(one.some(word => status.includes(word))){
        return "#3DC13C"
    }
    else if(two.some(word => status.includes(word))){
        return "#B57BFF"
    }
    else if(three.some(word => status.includes(word))){
        return "#FD8E39"
    }
    else if(four.some(word => status.includes(word))){
        return "#3F66FB"
    }
    else if(five.some(word => status.includes(word))){
        return "#FFFFFF"
    }else if(six.some(word => status.includes(word))){
        return "#3F66FB"
    }
}
