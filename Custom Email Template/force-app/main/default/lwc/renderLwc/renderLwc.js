import { LightningElement } from 'lwc';
import template1 from './template1.html';
import parent from './renderLwc.html';

export default class RenderLwc extends LightningElement {
    flag = false;

    render(){
        return this.flag?template1:parent;
    }

    handleClick(){
        this.flag = this.flag?false:true;
    }

}