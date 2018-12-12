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
	lastfeedingtime,
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
	cat_1_used,
	cat_1_uid,
	cat_1_lastfeedingtime,
	cat_1_extra_amount_size,
	cat_1_extra_amount_number,
	cat_1_extra_amount_delay,
	cat_2_used,
	cat_2_uid,
	cat_2_lastfeedingtime,
	cat_2_extra_amount_size,
	cat_2_extra_amount_number,
	cat_2_extra_amount_delay
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

		case ConfigurationKey::cnoshConfiguration:
			return "cnoshConfiguration";

		case ConfigurationKey::startdate:
			return "startdate";

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
