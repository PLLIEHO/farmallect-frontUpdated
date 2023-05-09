import React from 'react'
import BasicCard from "./card";

class List extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                <div>
                    <BasicCard name={"Аспирин"} content={"Ацетилсалициловая кислота, распространённое обезболивающее"}></BasicCard>
                </div>
                <div>
                    <BasicCard name={"Рыбий жир"} content={"Омега-3, предотвращает появление холестирина"}></BasicCard>
                </div>
            </div>
        )
    }
}

export default List