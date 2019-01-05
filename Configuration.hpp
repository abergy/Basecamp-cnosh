/*
   Basecamp - ESP32 library to simplify the basics of IoT projects
   Written by Merlin Schumacher (mls@ct.de) for c't magazin für computer technik (https://www.ct.de)
   Licensed under GPLv3. See LICENSE for details.
   */

#ifndef Configuration_h
#define Configuration_h

#include "debug.hpp"

#include <sstream>
#include <list>
#include <map>
#include <ArduinoJson.h>
#include <SPIFFS.h>

// TODO: Extend with all known keys
enum class ConfigurationKey {
	deviceName,
	accessPointSecret,
	wifiConfigured,
	wifiEssid,
	wifiPassword,
	mqttActive,
	mqttHost,
	mqttPort,
	mqttUser,
	mqttPass,
	otaActive,
	otaPass,
	// Settings
	cnoshConfiguration,
	startdate,
	last_savedate,
	last_feedingtime,
	total_amount_time,
	total_amount_extra,
	// Feeding times
	time_1_h,
	time_1_m,
	time_2_h,
	time_2_m,
	time_3_h,
	time_3_m,
	time_4_h,
	time_4_m,
	time_amount_size,
	// Cats
	c1_uid,
	c1_name,
	c1_lastfeedingtime,
	c1_extra_amount_size,
	c1_extra_amount_number,
	c1_extra_amount_count,
	c1_extra_delay,
	c1_created,
	c2_uid,
	c2_name,
	c2_lastfeedingtime,
	c2_extra_amount_size,
	c2_extra_amount_number,
	c2_extra_amount_count,
	c2_extra_delay,
	c2_created,
	c3_uid,
	c3_name,
	c3_lastfeedingtime,
	c3_extra_amount_size,
	c3_extra_amount_number,
	c3_extra_amount_count,
	c3_extra_delay,
	c3_created
};

// TODO: Extend with all known keys
static const String getKeyName(ConfigurationKey key)
{
	// This automatically will break the compiler if a known key has been forgotten
	// (if the warnings are turned on exactly...)
	switch (key)
	{
		case ConfigurationKey::deviceName:
			return "DeviceName";

		case ConfigurationKey::accessPointSecret:
			return "APSecret";

		case ConfigurationKey::wifiConfigured:
			return "WifiConfigured";

		case ConfigurationKey::wifiEssid:
			return "WifiEssid";

		case ConfigurationKey::wifiPassword:
			return "WifiPassword";

		case ConfigurationKey::mqttActive:
			return "MQTTActive";

		case ConfigurationKey::mqttHost:
			return "MQTTHost";

		case ConfigurationKey::mqttPort:
			return "MQTTPort";

		case ConfigurationKey::mqttUser:
			return "MQTTUser";

		case ConfigurationKey::mqttPass:
			return "MQTTPass";

		case ConfigurationKey::otaActive:
			return "OTAActive";

		case ConfigurationKey::otaPass:
			return "OTAPass";
// SETTINGS
		case ConfigurationKey::cnoshConfiguration:
			return "cnoshConfiguration";

		case ConfigurationKey::startdate:
			return "startdate";

		case ConfigurationKey::last_savedate:
			return "last_savedate";

		case ConfigurationKey::last_feedingtime:
			return "last_feedingtime";

		case ConfigurationKey::total_amount_time:
			return "total_amount_time";

		case ConfigurationKey::total_amount_extra:
			return "total_amount_extra";
// FEEDING_TIMES
		case ConfigurationKey::time_1_h:
			return "time_1_h";

		case ConfigurationKey::time_1_m:
			return "time_1_m";

		case ConfigurationKey::time_2_h:
			return "time_2_h";

		case ConfigurationKey::time_2_m:
			return "time_2_m";

		case ConfigurationKey::time_3_h:
			return "time_3_h";

		case ConfigurationKey::time_3_m:
			return "time_3_m";

		case ConfigurationKey::time_4_h:
			return "time_4_h";

		case ConfigurationKey::time_4_m:
			return "time_4_m";

		case ConfigurationKey::time_amount_size:
			return "time_amount_size";
// CATS
		case ConfigurationKey::c1_uid:
			return "c1_uid";

		case ConfigurationKey::c1_name:
			return "c1_name";

		case ConfigurationKey::c1_lastfeedingtime:
			return "c1_lastfeedingtime";

		case ConfigurationKey::c1_extra_amount_size:
			return "c1_extra_amount_size";

		case ConfigurationKey::c1_extra_amount_number:
			return "c1_extra_amount_number";

		case ConfigurationKey::c1_extra_amount_count:
			return "c1_extra_amount_count";

		case ConfigurationKey::c1_extra_delay:
			return "c1_extra_delay";

		case ConfigurationKey::c1_created:
			return "c1_created";

		case ConfigurationKey::c2_uid:
			return "c2_uid";

		case ConfigurationKey::c2_name:
			return "c2_name";

		case ConfigurationKey::c2_lastfeedingtime:
			return "c2_lastfeedingtime";

		case ConfigurationKey::c2_extra_amount_size:
			return "c2_extra_amount_size";

		case ConfigurationKey::c2_extra_amount_number:
			return "c2_extra_amount_number";

		case ConfigurationKey::c2_extra_amount_count:
			return "c2_extra_amount_count";

		case ConfigurationKey::c2_extra_delay:
			return "c2_extra_delay";

		case ConfigurationKey::c2_created:
			return "c2_created";

		case ConfigurationKey::c3_uid:
			return "c3_uid";

		case ConfigurationKey::c3_name:
			return "c3_name";

		case ConfigurationKey::c3_lastfeedingtime:
			return "c3_lastfeedingtime";

		case ConfigurationKey::c3_extra_amount_size:
			return "c3_extra_amount_size";

		case ConfigurationKey::c3_extra_amount_number:
			return "c3_extra_amount_number";

		case ConfigurationKey::c3_extra_amount_count:
			return "c3_extra_amount_count";

		case ConfigurationKey::c3_extra_delay:
			return "c3_extra_delay";

		case ConfigurationKey::c3_created:
			return "c3_created";
	}
	return "";
}

class Configuration {
	public:
		// Default constructor: Memory-only configuration (NO EEPROM read/writes
		Configuration();
		// Constructor with filename: Can be read from and written to EEPROM
		explicit Configuration(String filename);
		~Configuration() = default;
		
		// Switched configuration to memory-only and empties filename
		void setMemOnly();
		// Sets new filename and removes memory-only tag
		void setFileName(const String& filename);
		// Returns memory-only state of configuration
		bool isMemOnly() {return _memOnlyConfig;}

		const String& getKey(ConfigurationKey configKey) const;

		// Both functions return true on successful load or save. Return false on any failure. Also return false for memory-only configurations.
		bool load();
		bool save();
		
		void dump();

		// Returns true if the key 'key' exists
		bool keyExists(const String& key) const;

		// Returns true if the key 'key' exists
		bool keyExists(ConfigurationKey key) const;

		// Returns true if the key 'key' exists and is not empty
		bool isKeySet(ConfigurationKey key) const;

		// Reset the whole configuration
		void reset();

		// Reset everything except the AP secret
		void resetExcept(const std::list<ConfigurationKey> &keysToPreserve);

		// FIXME: Get rid of every direct access ("name") set() and get()
		// to minimize the rist of unknown-key usage. Move to private.
		void set(String key, String value);
		// FIXME: use this instead
		void set(ConfigurationKey key, String value);

		// FIXME: Get rid of every direct access ("name") set() and get()
		// to minimize the rist of unknown-key usage. Move to private.
		const String& get(String key) const;
		// FIXME: use this instead
		const String& get(ConfigurationKey key) const;
		char* getCString(String key);
		struct cmp_str
		{
			bool operator()(const String &a, const String &b) const
			{
				return strcmp(a.c_str(), b.c_str()) < 0;
			}
		};

		std::map<String, String, cmp_str> configuration;

	private:
		static void CheckConfigStatus(void *);
		String _jsonFile;
		bool _configurationTainted = false;
		String noResult_ = {};
		// Set to true if configuration is memory-only
		bool _memOnlyConfig;
};

#endif
