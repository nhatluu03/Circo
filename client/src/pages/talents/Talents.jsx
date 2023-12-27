import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import "./Talents.scss";

export default function Talents() {
  const [talents, setTalents] = useState([
    // {
    //   _id: "̃32892334",
    //   fullname: "Luu Quoc Nhat",
    //   username: "nhat_luu",
    //   images: [
    //     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALEAvAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EAEEQAAEDAgQCBwQIBAQHAAAAAAEAAgMEEQUSITEGQRMiMlFhcaEUUoGRFSNCscHR4fAHM1NyJEOj8RY0VGJjgqL/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EAB4RAQEBAAIDAQEBAAAAAAAAAAABEQISEyExUUED/9oADAMBAAIRAxEAPwD04BLbRSBqUBddccMARlUgCWymmGhqcAlAS2RQAlQlQCEIUAiyVCAsgBA3SoBCEIFQkQgEIQig7Jp2TjskRERSjZOKLII0qQFCBUqRF0DkJLougchNulugchNui6gddF0wmwTC9UTXRdVzImmRBazJwKpiVSMkuQEFlIU0O0RdAt0l0JEDiUiRCBUiS6RBCHJwcoGlPGiCW6VRZkocgkui6ZdF0DwUt1HdLdA+6Lpl0XQKdVC8aqW6QoKzjY3UZerL48yiMKojBubKxFpqmCJTMblREgdojPqmpLaoqUPvoluoRonAoJLpLpt0XQOui6bdJdBWB0SZkvJIQiHByXNooikvZRVgOS3VXOnB90FjMjMogbpURJmRdRjdKgkui6Yi6ofdLdR3Rmsgkui6gc9KHoJrououkSh6CS6AUzMjMgkui6ZmRdA+6Ey6LoIjsksi6QlQKWppCLpUDbd6UAckEJqCQaJC5MGqSQsjjdJI4MY0ZnOPIBFMq66GjY19TIWNJytsCbnyGqhZjNE9oc18uvvROb94XAYpiVZX1E1Q8TshzEMDnBjWt5a/vmuerp5C0vZKco+015RZNe0tq4H2yyN17zZSh4cNCCPBeDYRxHPT1xhnxeaGmLTncDmIPLkVt0nFDoXNfDxCcw1LJRmB7wR3fmi9XrwKUuUFHIailhncxzDLG15a7dtwDY+OqmyoyS+qXdUKrFaOmJbmMj+5mqqOx8f5cTR/c4n7lTK2bJNlxWL/AMQKTDcwkmjM406KJuY/HuXAYt/EjHa2Q+zzmmi5COwPz/fkmxZxte7ApQV4FhvH3ENHKHCvfM2+rZ+sD89fkvWuC+KYeJqGWRkLoZoSGyt3bc6ix/DdX6l446YIKYChRIddF01CBLJLKt7bH7yX2yP3kxOyxZKq3tcfvJfao/eTDsdPK2CGSZ9ssbS45ttBfVeT8RY3WYlO6pirDHS9iAuGr3NOvVvoN9dCbW1XouP4iylwasmbGJi2I/Vl2UO8LrwCuMzK1wLvqrkts4kaknTu+Kl9OnD3HawcbV1PgcUbsz3sBZkj6gDRtsqcXHcj25HdJSP/AKrB0vzaSCfmuSL3ZT1iq4kcHdljvMXU1vrHYY3j5rsG6WWamfWteA10UZGZmtyQ4Cx2sO6+pXOVFRPWRshlqDZrQSd/QbKD6QnhjNO+OMRPHWYxgBI81WfNnnvdzWuOtjqB4eKLZi7FhokIbHKZD7rG3W5gfDFTNXwSXaAyRri09wN9+SnpsSoow1lPCyONos0B4uB3/et04rBBh/1TWZyOq7NrfmbWSxmuxruMskop6GjbJOdC577sB5301HyVevx+qdSlj5G5nGxyNy38vD9Fx+HSsjDnvdck2ue4fn+CsVNWHFo5NGvmqmLntLhzv36rmeJ8Wq5Kr6PpZuhiYLzStNib8rrVbUt5rj8Ue6XFagjQBxcPEn9FNJ6Vuio2nJlee9xTK3DujiE0DszDv4K1GclhIL3F7KSmkyTuiv8AVu71Z7c7z5SsFpN7uNj3r3X+FMtKeEIGUwAlbI/2jvz30v8ADL+wvDKkBtQ8DRuYj1XW/wAMMdOE4+ynlf8A4WsIikHIO+yfO+nxTj9x05e+OveWuTsyrNmA0J25pemb7y31cOyxdF1X6ZvvJOnb7ydTs4xtZc2DvVSGrcBfMqow0g6VcN/NL7C929VD8078V6cvxN7c6/aKUVzveKrjDTfWqj+an+jbgfWs87p3h05fitjgdiGDVUHSll25s39pDvwXlQeJKiSTcM2+5euzYVI+lmZ0zMro3A694XldLEX00gAbmLjvtuPzXPlylrt/nLOPtnuGQZTrzCijNn3VioIc0Eb6j1VM9oKNirfnkDvBRPdZ2iWY7JJe0PIILEc7m36yuwVricrnaAaLJB8bJ8WYdcDq7Epo34sSc1+XNp/v+atHELm+Zcy+TUKfpufepo3xX/8AcsuqnzTvkDhe+t1WEyjla5obL9l+nxVSrpqmOb2dtieSaZg6YOHeqTX6qxTgOcXfZZqVZXPlFWpN5pj/AOV33lFM90c0b2dprgR802e+e3iSfjdbXBuDz4vjUUcTHOZCRLIeWm3rZSfW/wCPWZMVlbu43SDF3kauUUmFVrnaR+o0UTsJrh/l+oXbvHm6VYdizuTlGcXkv2lXOFV39H1CT6Krv6PqE7xejkJOGat0nR4dUe295jBDR/7XsrUPBWNOu574o/OQkr1NsIAs3KByAFgmPp2u6uRpJ8V5+kejyV5keCsWGoqYz4XKT/g7GxqJWEd2cr1BkDGsDAAAOQ5eqd0bQLJ4+J5K8vh4Ux+KVrxkcAdQ6QkEeSycYw6rwmVxqqcszvc9tjo7s7eq9hmljhY57yA1ouSTYBchifE2FYn0mHOoG1uh1a64bbnmtceYTrxizla8uqXb2FhsFScdV01RhOHl8umIR69VsbA4D4uIP3lZ7sDe9xFM+R1zoJWAH0JTVxiSX6tkoIcTc2I5rXmwCtije9zWlrBoc2w5qkyhqmOB6LNrvYEFXTFbK3+p6FOjgc9wy2dfuutX2apMZzQsa1zSLsiGnoinw2VsjSWuYwnR5YT6qUxZHBuNPomzsgjeHi/RiVof8is+owbE6KF01VRTxRtIDnlmg8yu5wvhHEqyAStxPqEDTKfzW7h3B1XDNG+qxASxtPWjLDlcO467KTsnaPHM1lYp52NaWStzMduL+o8V2PFfCVFh9cGiV0EMpOSVozjycPD97WWbJwFiD2CSjxDDZ43C7SJy028iNFuQ2MltBTyC8U73N7ha/wCiZUOjp2CMEC20YNyfEq1JwtjEL7Pp6eZo3DaqLX/6uq82C1MAL3RujbfZ+tviNFbKvpmdtxLiL+K7fhzCsZOFMqcDlIZN/MyyWdnBIIOnL8fFY2C8NV2KO/wkRl17TToPiV61wbw0/h+kkZNNnlnIL2t7DSO7x8VJx36lsjkfo7i63Wqnt/ul/RSjBeLCbDEfh0p/JemtjB3Fwk9mjDSGsDb826KeOJ5K8zOCcXDav/1f0R9C8Yf9d/q/ovRzTSg3jmDh3SMB9RZMPtF/+Tgd4iX8wnjh3qYNTg1QyVLYwTtZYeKcU09E0tDs8nIBarON+R4Y0lxsBzzLnsU4qjp3CGjaaqfYNadB5rCD8W4hkILnQwX2bzXR4NgNLhozM60p3cd1GvTIfhGJY201OOzvhpm9mljOUHzVZ1LS0odDTwCKLmG6E/HddnUDLGQe7RczVNs5wNtUw1lVVJE9rWse8X1NjuoYsOYLtEkheSdTY2Wi5jT3bJ7XtjOUW0WMa1QOChzLe0vbe9zr1kn0M6BpHTXjd3aLQlke8aPAChkjLyLycrJhrKbRObnY4lwve4Jbf4JjqNpezLe4Ny3b7lqspD0jXPkNtldFNAADbUHdTF2HYdiFTFQ9HGxpAtuTskkxOtvoAPiUWa0nL5qS7HkF2XZX4mRhYpUPxK8dc4WOmxuFzzInUUzaaaXNG/8AlyNuRb813T4KV3asqtbhlNUU3R5RcbIMKfBCyNkpFPKx2zspULqJ0LrNgpW6btadR81foKuTDagU1YC+E6NLlsT4XFUWkhIyEXQclkeyZr2tga/kWg6L0XhCpkqqIulmkc4G2rrj1XLzYK++gaQtzh6E0rcpNlqM8vjrQ3ukPxslsTvO4eVkyGzmC5UmVtltgBtjfpHO8z+icm2byQiPMq3GKzE5MlOHMYftK/g/Doc7pam7nHW7lrUOFRwbN2WpEwsFgNFI6adT0zYWZWAWCsxttqmsUl9EYQ1usTrdy5WozOeV1lR1mEeC5esYRIbb3VVWjpy690ppANSpYGv53Ur2ONggoOpnX6qlYw2sW2IVxjQ3Q7oOVpuFMXUbGG2qeILpRJqpmPvoUw1Aaa+yDSuAWjGWkJXAW0UNZPsxzaqxFS+ClkFjomdI5uiYuq2IYVFUROu3WyyKSqmw2b2eoJ6P7J/Bb5mI32VDE6UVEdx3KWKtU8jZeybrQp48r9ea46iqJaGfJLq1dZQ1ImYCN0npLG5TOaG2Cnus6FxAuVZbJotRhPdLdQh6dmVFNhHNTNsdlVAspmFZWrACVRtOiXMrA2bslZ8sd3XIV550KrP3QVuiA2amlisEJhCoqPaoi1W3tTMiqK2TVSMZqpcikjjQOibopLaJzGILVBWlGhUNrlWntuoiyxRUDmJBEDoVYDU8NupVjCxHDw8EtbYqjR1b6OUMftddYYszSDqsbE8PBGZo1UVs0FX0zQcy0mC4uuFoKt9JJlftddTRVzZGjVWJWkTYXTc6jEgcNEKskTmoQoqQJUiEQjtlWfuhCBqQ7IQqqNyZzQhAqlYkQgmah2yEKCMqNyEIG808bIQixIxQVnZPkhCDlcQ/mjzWhhWwQhUdBT9lTIQjL//Z",
    //     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALEAvAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EAEEQAAEDAgQCBwQIBAQHAAAAAAEAAgMEEQUSITEGQRMiMlFhcaEUUoGRFSNCscHR4fAHM1NyJEOj8RY0VGJjgqL/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EAB4RAQEBAAIDAQEBAAAAAAAAAAABEQISEyExUUED/9oADAMBAAIRAxEAPwD04BLbRSBqUBddccMARlUgCWymmGhqcAlAS2RQAlQlQCEIUAiyVCAsgBA3SoBCEIFQkQgEIQig7Jp2TjskRERSjZOKLII0qQFCBUqRF0DkJLougchNulugchNui6gddF0wmwTC9UTXRdVzImmRBazJwKpiVSMkuQEFlIU0O0RdAt0l0JEDiUiRCBUiS6RBCHJwcoGlPGiCW6VRZkocgkui6ZdF0DwUt1HdLdA+6Lpl0XQKdVC8aqW6QoKzjY3UZerL48yiMKojBubKxFpqmCJTMblREgdojPqmpLaoqUPvoluoRonAoJLpLpt0XQOui6bdJdBWB0SZkvJIQiHByXNooikvZRVgOS3VXOnB90FjMjMogbpURJmRdRjdKgkui6Yi6ofdLdR3Rmsgkui6gc9KHoJrououkSh6CS6AUzMjMgkui6ZmRdA+6Ey6LoIjsksi6QlQKWppCLpUDbd6UAckEJqCQaJC5MGqSQsjjdJI4MY0ZnOPIBFMq66GjY19TIWNJytsCbnyGqhZjNE9oc18uvvROb94XAYpiVZX1E1Q8TshzEMDnBjWt5a/vmuerp5C0vZKco+015RZNe0tq4H2yyN17zZSh4cNCCPBeDYRxHPT1xhnxeaGmLTncDmIPLkVt0nFDoXNfDxCcw1LJRmB7wR3fmi9XrwKUuUFHIailhncxzDLG15a7dtwDY+OqmyoyS+qXdUKrFaOmJbmMj+5mqqOx8f5cTR/c4n7lTK2bJNlxWL/AMQKTDcwkmjM406KJuY/HuXAYt/EjHa2Q+zzmmi5COwPz/fkmxZxte7ApQV4FhvH3ENHKHCvfM2+rZ+sD89fkvWuC+KYeJqGWRkLoZoSGyt3bc6ix/DdX6l446YIKYChRIddF01CBLJLKt7bH7yX2yP3kxOyxZKq3tcfvJfao/eTDsdPK2CGSZ9ssbS45ttBfVeT8RY3WYlO6pirDHS9iAuGr3NOvVvoN9dCbW1XouP4iylwasmbGJi2I/Vl2UO8LrwCuMzK1wLvqrkts4kaknTu+Kl9OnD3HawcbV1PgcUbsz3sBZkj6gDRtsqcXHcj25HdJSP/AKrB0vzaSCfmuSL3ZT1iq4kcHdljvMXU1vrHYY3j5rsG6WWamfWteA10UZGZmtyQ4Cx2sO6+pXOVFRPWRshlqDZrQSd/QbKD6QnhjNO+OMRPHWYxgBI81WfNnnvdzWuOtjqB4eKLZi7FhokIbHKZD7rG3W5gfDFTNXwSXaAyRri09wN9+SnpsSoow1lPCyONos0B4uB3/et04rBBh/1TWZyOq7NrfmbWSxmuxruMskop6GjbJOdC577sB5301HyVevx+qdSlj5G5nGxyNy38vD9Fx+HSsjDnvdck2ue4fn+CsVNWHFo5NGvmqmLntLhzv36rmeJ8Wq5Kr6PpZuhiYLzStNib8rrVbUt5rj8Ue6XFagjQBxcPEn9FNJ6Vuio2nJlee9xTK3DujiE0DszDv4K1GclhIL3F7KSmkyTuiv8AVu71Z7c7z5SsFpN7uNj3r3X+FMtKeEIGUwAlbI/2jvz30v8ADL+wvDKkBtQ8DRuYj1XW/wAMMdOE4+ynlf8A4WsIikHIO+yfO+nxTj9x05e+OveWuTsyrNmA0J25pemb7y31cOyxdF1X6ZvvJOnb7ydTs4xtZc2DvVSGrcBfMqow0g6VcN/NL7C929VD8078V6cvxN7c6/aKUVzveKrjDTfWqj+an+jbgfWs87p3h05fitjgdiGDVUHSll25s39pDvwXlQeJKiSTcM2+5euzYVI+lmZ0zMro3A694XldLEX00gAbmLjvtuPzXPlylrt/nLOPtnuGQZTrzCijNn3VioIc0Eb6j1VM9oKNirfnkDvBRPdZ2iWY7JJe0PIILEc7m36yuwVricrnaAaLJB8bJ8WYdcDq7Epo34sSc1+XNp/v+atHELm+Zcy+TUKfpufepo3xX/8AcsuqnzTvkDhe+t1WEyjla5obL9l+nxVSrpqmOb2dtieSaZg6YOHeqTX6qxTgOcXfZZqVZXPlFWpN5pj/AOV33lFM90c0b2dprgR802e+e3iSfjdbXBuDz4vjUUcTHOZCRLIeWm3rZSfW/wCPWZMVlbu43SDF3kauUUmFVrnaR+o0UTsJrh/l+oXbvHm6VYdizuTlGcXkv2lXOFV39H1CT6Krv6PqE7xejkJOGat0nR4dUe295jBDR/7XsrUPBWNOu574o/OQkr1NsIAs3KByAFgmPp2u6uRpJ8V5+kejyV5keCsWGoqYz4XKT/g7GxqJWEd2cr1BkDGsDAAAOQ5eqd0bQLJ4+J5K8vh4Ux+KVrxkcAdQ6QkEeSycYw6rwmVxqqcszvc9tjo7s7eq9hmljhY57yA1ouSTYBchifE2FYn0mHOoG1uh1a64bbnmtceYTrxizla8uqXb2FhsFScdV01RhOHl8umIR69VsbA4D4uIP3lZ7sDe9xFM+R1zoJWAH0JTVxiSX6tkoIcTc2I5rXmwCtije9zWlrBoc2w5qkyhqmOB6LNrvYEFXTFbK3+p6FOjgc9wy2dfuutX2apMZzQsa1zSLsiGnoinw2VsjSWuYwnR5YT6qUxZHBuNPomzsgjeHi/RiVof8is+owbE6KF01VRTxRtIDnlmg8yu5wvhHEqyAStxPqEDTKfzW7h3B1XDNG+qxASxtPWjLDlcO467KTsnaPHM1lYp52NaWStzMduL+o8V2PFfCVFh9cGiV0EMpOSVozjycPD97WWbJwFiD2CSjxDDZ43C7SJy028iNFuQ2MltBTyC8U73N7ha/wCiZUOjp2CMEC20YNyfEq1JwtjEL7Pp6eZo3DaqLX/6uq82C1MAL3RujbfZ+tviNFbKvpmdtxLiL+K7fhzCsZOFMqcDlIZN/MyyWdnBIIOnL8fFY2C8NV2KO/wkRl17TToPiV61wbw0/h+kkZNNnlnIL2t7DSO7x8VJx36lsjkfo7i63Wqnt/ul/RSjBeLCbDEfh0p/JemtjB3Fwk9mjDSGsDb826KeOJ5K8zOCcXDav/1f0R9C8Yf9d/q/ovRzTSg3jmDh3SMB9RZMPtF/+Tgd4iX8wnjh3qYNTg1QyVLYwTtZYeKcU09E0tDs8nIBarON+R4Y0lxsBzzLnsU4qjp3CGjaaqfYNadB5rCD8W4hkILnQwX2bzXR4NgNLhozM60p3cd1GvTIfhGJY201OOzvhpm9mljOUHzVZ1LS0odDTwCKLmG6E/HddnUDLGQe7RczVNs5wNtUw1lVVJE9rWse8X1NjuoYsOYLtEkheSdTY2Wi5jT3bJ7XtjOUW0WMa1QOChzLe0vbe9zr1kn0M6BpHTXjd3aLQlke8aPAChkjLyLycrJhrKbRObnY4lwve4Jbf4JjqNpezLe4Ny3b7lqspD0jXPkNtldFNAADbUHdTF2HYdiFTFQ9HGxpAtuTskkxOtvoAPiUWa0nL5qS7HkF2XZX4mRhYpUPxK8dc4WOmxuFzzInUUzaaaXNG/8AlyNuRb813T4KV3asqtbhlNUU3R5RcbIMKfBCyNkpFPKx2zspULqJ0LrNgpW6btadR81foKuTDagU1YC+E6NLlsT4XFUWkhIyEXQclkeyZr2tga/kWg6L0XhCpkqqIulmkc4G2rrj1XLzYK++gaQtzh6E0rcpNlqM8vjrQ3ukPxslsTvO4eVkyGzmC5UmVtltgBtjfpHO8z+icm2byQiPMq3GKzE5MlOHMYftK/g/Doc7pam7nHW7lrUOFRwbN2WpEwsFgNFI6adT0zYWZWAWCsxttqmsUl9EYQ1usTrdy5WozOeV1lR1mEeC5esYRIbb3VVWjpy690ppANSpYGv53Ur2ONggoOpnX6qlYw2sW2IVxjQ3Q7oOVpuFMXUbGG2qeILpRJqpmPvoUw1Aaa+yDSuAWjGWkJXAW0UNZPsxzaqxFS+ClkFjomdI5uiYuq2IYVFUROu3WyyKSqmw2b2eoJ6P7J/Bb5mI32VDE6UVEdx3KWKtU8jZeybrQp48r9ea46iqJaGfJLq1dZQ1ImYCN0npLG5TOaG2Cnus6FxAuVZbJotRhPdLdQh6dmVFNhHNTNsdlVAspmFZWrACVRtOiXMrA2bslZ8sd3XIV550KrP3QVuiA2amlisEJhCoqPaoi1W3tTMiqK2TVSMZqpcikjjQOibopLaJzGILVBWlGhUNrlWntuoiyxRUDmJBEDoVYDU8NupVjCxHDw8EtbYqjR1b6OUMftddYYszSDqsbE8PBGZo1UVs0FX0zQcy0mC4uuFoKt9JJlftddTRVzZGjVWJWkTYXTc6jEgcNEKskTmoQoqQJUiEQjtlWfuhCBqQ7IQqqNyZzQhAqlYkQgmah2yEKCMqNyEIG808bIQixIxQVnZPkhCDlcQ/mjzWhhWwQhUdBT9lTIQjL//Z",
    //     "data:image/jpeg;base64,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",
    //   ],
    //   badges: ["trusted", "featured"],
    //   followers: 1600,
    //   commissions: 148,
    //   rating: 4.5,
    // },
  ]);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        console.log(response.data);
        setTalents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTalents();
  }, [])

  return (
    <div className="talent-container">
      {talents.map((talent, index) => (
            <Link key={index} className="talent-item"  to={`/talents/${talent.talent._id}`}>
            <div className="talent-item__bg-container">
              <img src={talent.top3Artworks.length >= 1 ? talent.top3Artworks[0].image : "https://th.bing.com/th/id/OIP.Z_PIeIRDajXPmZHROt-T_QHaEK?w=324&h=182&c=7&r=0&o=5&pid=1.7"} className="talent-item__bg-item" />
              <img src={talent.top3Artworks.length >= 1 ? talent.top3Artworks[1].image : "https://th.bing.com/th/id/OIP.Z_PIeIRDajXPmZHROt-T_QHaEK?w=324&h=182&c=7&r=0&o=5&pid=1.7"} className="talent-item__bg-item" />
              <img src={talent.top3Artworks.length >= 1 ? talent.top3Artworks[2].image : "https://th.bing.com/th/id/OIP.Z_PIeIRDajXPmZHROt-T_QHaEK?w=324&h=182&c=7&r=0&o=5&pid=1.7"} className="talent-item__bg-item" />
            </div>

            <div className="user-info">
              <img
                src="data:image/jpeg;base64,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"
                className="user-info__avt "
              />

              <div className="user-info__name">
                <p className="user-info__name__fullname">{talent.talent.username}</p>
                <p className="user-info__name__username">@{talent.talent.username}</p>
              </div>
            </div>

            <div className="talent-item__extra">
              <span>{talent.talent.followers.length} followers</span>&#x2022;
              <span>{talent.commissions} commissions</span>&#x2022;
              <span>
                {talent.talent.rating}
                <img
                  className="rating-ic"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAjRJREFUSEu1lU9oE0EUxr+3iYKipMbZ2KMgIiIozeylYKEoVvwDHtRbURREPAid0CKoh1xaPHXXi6deVPQoqBQRVBSLB5vdai/Vk/SY7qYUi3pIsk+2aTVN0uyI7dxm93vfb2a+N7uEDR60wf7QBnC+N1lKfX8FonDnwvY+yr+t6CxOGxA42X4wPYxMGdxvKu/RugJ8W34m4GANgGlTuYfWDRDY2SMAva43ZDZ6zdzkuziI1hGVHDnOjJOrzfiZUN6Z/wb4jrWPmGeApobgZDKxp+P6x2/tIH92ENztOspMp4gpAyDDwC4iZMAwASTWMKmC4DNjjoAigDkGigQeF8p7E9X8BdhyEcC2uC1rvi8K5XY2Aq4BuKdp0E7GYFwSOff+KkA0KdnWZQaPtThvXe5PA3QurQovVgqauqjkyPPMeAwgqeu6rPNDGH0ZNfmpvq5lm87b1okQ/BTAJk3I10Q1PL5jcGq2Ub/mPQhsGeUR5RI7DEJPesCdaCVsA7A+ANwd674koNtCFYa1AbUv5+Iv3RwYmDCV26MNmHfk4ZDxXm/1S6pqpVJOdQ5N/9DKIHDkDTDuNIoZ5NR6mwea4XxWKO+JHmBUPgfhdJ14hjm8YOamCtEzf7TLIjKiVt67omFgzFTuFS2Ab0ufAAGgTODh9FYaoatuub6Y8wc2B6ktNwl8azmrWaHc3VqAwJYvAXSgioti0P3SLovAzu4HjAdAuCCUd0wL8A/hxkq1fjixLm0EvwGYQ7sZl7lmPgAAAABJRU5ErkJggg=="
                />
              </span>
            </div>

            <div className="talent-item__badge-container">
              {["trusted", "featured"].map((badge) => {
                return (
                  <div className="talent-item__badge-item">
                    {badge.charAt(0).toUpperCase() + badge.slice(1)}
                  </div>
                );
              })}
            </div>

            <button className="order-commission-btn">Order commission</button>
          </Link>
      ))}
    </div>
  );
}
