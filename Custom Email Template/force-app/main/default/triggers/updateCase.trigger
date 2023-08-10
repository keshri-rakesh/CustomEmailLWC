trigger updateCase on Case (before insert) {
   
    for(Case cs : Trigger.new){
        if(cs.Origin == 'Email'){
            cs.Status = 'New';
            cs.Priority = 'Medium';
        }
    }
    
}