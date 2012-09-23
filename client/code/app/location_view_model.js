var LocationModel = function() {
    this.timestamp = ko.observable("");
    this.latitude = ko.observable("");
    this.longitude = ko.observable("");
    this.available = ko.observable(false);
    this.speed = ko.observable(false);
    this.batteryLife = ko.observable(0);
    this.gsmSignal = ko.observable(0);
    this.cellId = ko.observable(0);
    this.countryCode = ko.observable(0);
    this.locationAreaCode = ko.observable(0);
    this.networkCode = ko.observable(0);
};

var locationModel = new LocationModel();

$(function() {
	ko.applyBindings(locationModel);
});


exports.updateView = function(tracker) {
	console.log("update view " + tracker.location.timestamp);
	locationModel.longitude(tracker.location.longitude);
	locationModel.latitude(tracker.location.latitude);
	locationModel.timestamp(new Date(tracker.location.timestamp));
	locationModel.available(tracker.location.available);
	locationModel.speed(tracker.location.speed);
	locationModel.gsmSignal(tracker.location.status.gsmSignal);
	locationModel.batteryLife(tracker.location.status.batteryLife);
	locationModel.cellId(tracker.location.network.cellId);
	locationModel.countryCode(tracker.location.network.countryCode);
	locationModel.locationAreaCode(tracker.location.network.locationAreaCode);
	locationModel.networkCode(tracker.location.network.networkCode);	    
};
