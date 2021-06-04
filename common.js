define([ 
        'knockout', 
        'ojs/ojcollectiondataprovider', 
        "ojs/ojmodel", 
        "ojs/ojtable"
    ],
    function(ko, CollectionDataProvider, Model ){
        function commonViewModel(){

            var self = this;
            self.serviceURL = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";


            // Create an object which has the required fields
            self.parseData = function(response) {
                return { name: response['name'], short_desc: response['short_desc'] };
              };

            // Extending the model
            self.Department = Model.Model.extend({
                urlRoot: self.serviceURL,
                parse: self.parseData,
                idAttribute: 'id'
            });

            // Create a model instance
            self.myDept = new self.Department();

            // Create a base object "class" for the entire dataset
            self.DeptCollection = Model.Collection.extend({
                url: self.serviceURL + "?limit=50",
                model: self.myDept
            });

            // Create a collection instance
            self.DeptCol = ko.observable();
            self.DeptCol(new self.DeptCollection());

            // Data source for the UI component
            // Wrap it in CollectionDataProvider
            self.datasource = ko.observable();
            self.datasource(new CollectionDataProvider(self.DeptCol()));



        };
        return commonViewModel;
    }
)