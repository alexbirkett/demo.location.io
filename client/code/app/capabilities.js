exports.capabilities = {
	commands : [{
		name : "oneTimeLocate",
		passwordRequired : true
	}],
	properties : [{
		name : "authorizedNumber",
		count : 5,
		writable : true,
		passwordRequired : true,
		parameters : [{
			type : "telephoneNumber",
			name : "authorizedNumber"
		}]
	}, {
		name : "continous-tracking",
		writable : true,
		passwordRequired : true,
		parameters : [{
			type : "time-period",
			name : "update-fequency"
		}]
	}, {
		name : "speeding-alarm",
		writable : true,
		passwordRequired : true,
		parameters : [{
			type : "boolean",
			name : "enabled"
		}, {
			type : "speed",
			name : "speed"
		}]
	}, {
		name : "geoFence",
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
	}, {
		name : "timeZone",
		writable : true,
		passwordRequired : true,
		parameters : [{
			type : "timezone",
			name : "timezone"
		}]
	}, {
		name : "lowBatteryAlarm",
		writable : true,
		passwordRequired : true,
		parameters : [{
			type : "boolean",
			name : "enabled"
		}, {
			type : "percentage",
			name : "percentage"
		}]
	}, {
		name : "changePassword",
		writable : true,
		passwordRequired : true,
		parameters : [{
			type : "password",
			name : "password"
		}]
	}]
}; 