require.config({
  paths:{
    cdn4jquery: "cdnlink",
    c2: "../sub1/sub2/credit2"
  }
})


define(["c2", "cdn4jquery", "product2"], function(credits,dummy,products) {

    console.log("Function : purchaseProduct");
  
    return {
        purchaseProduct: function() {
  
                var credit = credits.getCredits();
                if(credit > 0){
                  products.reserveProduct();
                  return true;
        };
        return false;
      }
    }
  });