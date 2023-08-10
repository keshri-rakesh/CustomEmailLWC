public with sharing class GetAllOpportunities {
    
    @AuraEnabled(cacheable = true)
    public static List<Opportunity> getOpps(String stg){
        try {
            String key = '%' + stg + '%';
            return [Select Id, Name, StageName from Opportunity where StageName LIKE: key];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}