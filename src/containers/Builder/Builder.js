import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Castle from '../../components/Castle/Castle';

class Builder extends Component {
    state={
        /*components1:{
            stoneBrick:0,
            stoneBrick1:0,
            stoneBrick2:0,
        },*/
        components:[["add"]],
        buildMode:'deCenter',
        styleComponents:{
            height: '100px',
            width: '100px',
            fontSize:'80px',
            lineHeight: '80px',
        }
    }
    addWall=(type,coOrdinates)=>{
        let updateWall=this.state.components;
            if(type==='add'){
            updateWall[coOrdinates[0]][coOrdinates[1]]='stoneBrick'
            if(!this.state.components[coOrdinates[0]][coOrdinates[1]+1]){
                updateWall[coOrdinates[0]].push("add");
                if(this.state.buildMode==='deCenter')updateWall[coOrdinates[0]].unshift("add");//deCenter
            }
            if(!this.state.components[coOrdinates[0]][coOrdinates[1]-1]){
                updateWall[coOrdinates[0]].unshift("add");
                if(this.state.buildMode==='deCenter')updateWall[coOrdinates[0]].push("add");//deCenter

            }
            //if(0<(coOrdinates[0]+1)){
                if(this.state.components[coOrdinates[0]+1]){
                    if(!this.state.components[coOrdinates[0]+1][coOrdinates[1]]){
                        if(this.state.buildMode==='deCenter'){
                            updateWall[coOrdinates[0]+1].push("add");
                            updateWall[coOrdinates[0]+1].unshift("add");//deCenter
                        }
                    }
                }
                else{
                    updateWall.push(["add"]);
                }
            //}
            if(this.state.components[coOrdinates[0]-1] ){
                if(!this.state.components[coOrdinates[0]-1][coOrdinates[1]]){
                    if(this.state.buildMode==='deCenter'){
                        updateWall[coOrdinates[0]-1].push("add");
                        updateWall[coOrdinates[0]-1].unshift("add");//deCenter
                    }
                }
            }
            else{
                updateWall.unshift(["add"]);
            }
        }else{
            updateWall[coOrdinates[0]][coOrdinates[1]]='add';
        }
        let sizeBrick =updateWall.length;
        updateWall.map((_,i)=>{
            if(sizeBrick<this.state.components[i].length){
                sizeBrick=this.state.components[i].length;//make repairs
            }
        });
        this.setState({components:updateWall,
        styleComponents:{
            height: (100*(1-sizeBrick*0.03))+'px',
            width: (100*(1-sizeBrick*0.03))+'px',
            fontSize:(80*(1-sizeBrick*0.03))+'px',
            lineHeight: (80*(1-sizeBrick*0.03))+'px'

        }})
    }
    buildMode=()=>{
        if(this.state.buildMode==='deCenter'){
            this.setState({buildMode:'Center'})
        }else{
            this.setState({buildMode:'deCenter'})
        }
    }


    render(){
        return(
            <Aux>
                <button onClick={this.buildMode}>build mode {this.state.buildMode}</button>
                <Castle added={this.addWall}
                components={this.state.components}
                styleComponents={this.state.styleComponents}/>
            </Aux>
        );
    }
}
export default Builder;
//undefined
