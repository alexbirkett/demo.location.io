exports.capabilities = {
	commands : [{
		name : "oneTimeLocate",
		passwordRequired : true
	}],
	properties : {
		authorizedNumber : {
			count : 5,
			writable : true,
			passwordRequired : true,
			parameters : [{
				type : "telephoneNumber",
				name : "authorizedNumber"
			}]
		},
		continuousTracking : {
			writable : true,
			passwordRequired : true,
			parameters : [{
				type : "timePeriod",
				name : "update-fequency"
			}]
		},
		speedingAlarm : {
			writable : true,
			passwordRequired : true,
			parameters : [{
				type : "boolean",
				name : "enabled"
			}, {
				type : "speed",
				name : "speed"
			}]
		},
		geoFence : {
			count : 5,
			writable : true,
			passwordRequired : true,
			parameters : [{
				type : "longitude",
				name : "minLongitude"
			}, {
				type : "longitude",
				name : "maxLongitude"
			}, {
				type : "latitude",
				name : "minLatitude"
			}, {
				type : "latitude",
				name : "maxLatitude"
			}]
		},
		timeZone : {
			writable : true,
			passwordRequired : true,
			parameters : [{
				type : "timeZone",
				name : "timeZone"
			}]
		},
		lowBatteryAlarm : {
			writable : true,
			passwordRequired : true,
			parameters : [{
				type : "boolean",
				name : "enabled"
			}, {
				type : "percentage",
				name : "percentage"
			}]
		},
		changePassword : {
			writable : true,
			passwordRequired : true,
			parameters : [{
				type : "password",
				name : "newPassword"
			}]
		}
	}
};
