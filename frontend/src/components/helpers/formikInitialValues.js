/** @description This is an object containing the initial values
 * required to initialize formik on the creata event form
 */
export const eventInitialValues = {
  details: {
    title: "",
    description: "",
    category: "",
    date: "",
    host: "",
    imageUrl: ""
  },
  status: "upcoming",
  venue: {name: "", capacity: 0, country: "", city: ""},
  speakers: [
    {
      name: "Mr. Francis Brian",
      picture: "",
      slots: [
        {
          time: "",
          topic: ""
        },
        {
          time: "",
          topic: ""
        },
        {
          time: "",
          topic: ""
        }
      ]
    },
    {
      name: "Sir. Liliame Mcrooney",
      picture: "",
      slots: [
        {
          time: "",
          topic: ""
        },
        {
          time: "",
          topic: ""
        },
        {
          time: "",
          topic: ""
        }
      ]
    }
  ]
}
