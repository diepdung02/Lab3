import { Text } from "react-native-paper";
import { useStateValue } from "../Store";

const DemoStore =()=>{
    const [controller, dispatch] = useStateValue();
    const {test} = controller;
    console.log(test);
    return(
        <Text>{test.a}</Text>
    )

}

export default DemoStore;