import moment from "moment-timezone"
import { Registration } from "../models/RegistrationModel.js"

export const uniqueorderid = async (data) => {
  var getlastid = await Registration.find({ }).sort({$natural:-1}).limit(1);
  var keyname = 'NATOMAS'
  const currentyear = moment(new Date()).format('YYYY')
  const currentDate = moment()
  let yearform
  const aprilFirst = moment(currentyear + '-04-01', 'YYYY-MM-DD')
  if (currentDate.isBefore(aprilFirst)) {
    yearform = moment(new Date()).subtract(1, 'year').format('YY') + moment(new Date()).format('YY')
  } else if (currentDate.isAfter(aprilFirst)) {
    yearform = moment(new Date()).format('YY') + moment(new Date()).add(1, 'year').format('YY')
  } else {
    yearform = moment(new Date()).format('YY') + moment(new Date()).add(1, 'year').format('YY')
  }

  const websitename = keyname

  let final_id
  if (getlastid && Array.isArray(getlastid) && getlastid.length !== 0) {
    const res = getlastid.reduce((max, order) => {
      console.log(order)
      const orderNumber = parseInt(order.Registration_id.split('-').pop(), 10)
      return Math.max(max, orderNumber)
    }, 0)
    const newNumber = res + 1

    final_id = websitename + '-' + yearform + '-' + `${String(newNumber).padStart(3, '0')}`
  } else {
    final_id = keyname + '-' + yearform + '-001'
    //+'-'+ data.Poster_Type == "RSVP"?"RSVP":"REG"
  }
  return final_id
}
