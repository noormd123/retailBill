(function() {
	
	/**
	 * Constructor.
	 *
	 * Initialize all the global variables
	*/
	RetailBill = function(grossAmt, subTotal, discountPercent) {
		this.grossAmt = grossAmt;
		this.subTotal = subTotal;
		this.discountPercent = discountPercent;
		this.discountAmt = 0;
		this.netAmt = 0;
	},
	
	RetailBill.prototype = {
		/**
		 * Calculate Amount Method
		*/
		calculateAmt: function() {
			this.discountAmt = parseFloat(this.subTotal) * parseFloat(this.discountPercent) / 100;
			this.netAmt = parseFloat(this.grossAmt) - parseFloat(this.discountAmt);
			this.displayAmt();
		},
		/**
		 * Display Amount Method
		*/
		displayAmt: function() {
			var $this = this;
			var $ids = ['grossAmt', 'discountAmt', 'netAmt'];
			
			$ids.forEach(function (id) {
				document.getElementById(id).innerText = $this[id].toFixed(2);
			});
		}
	}
	
	Retail = function($gross, $subTotal, $discountPercent) {
		var $Retail = new RetailBill($gross, $subTotal, $discountPercent);
		return $Retail;
	}	
	
})();

/**
 * Submit Data Method.
 * Trigger onClick of Submit Button
*/		
function submitData()
{
	var $userType = document.getElementById("userType").value;
	var $table = document.getElementById("bill-summary");
	var $type = $table.getElementsByTagName('select');
	var $price = $table.getElementsByTagName('input');	
	
	var $nonDiscountItem = 'grocery';
	var $defaultCustomer = 'Customer';
	var $gross = 0;
	var $subTotal = 0;
	var $discountPercent = document.getElementById('discount').value;
	
	for (var i = 0; i < $type.length; i++) 
	{		
		if($type[i].options[$type[i].selectedIndex].value != $nonDiscountItem)
		{
			$subTotal = parseFloat($subTotal) + parseFloat($price[i].value);
		}
		
		$gross = parseFloat($gross) + parseFloat($price[i].value);
	}
	
	if ($userType === $defaultCustomer)	
	{
		$subTotal = (Math.floor($subTotal / 100)) * 100;
	}
	
	var $retail = Retail($gross, $subTotal, $discountPercent);	
	$retail.calculateAmt();
}
