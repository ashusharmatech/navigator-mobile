<template>
  <GridLayout rows="auto, *">
    <SearchBar
      row="0"
      hint="Search mutual funds..."
      v-model="searchTerm"
      @textChange="onSearchChange"
      class="search-bar"
    />
    <ListView
      row="1"
      for="scheme in filteredSchemes"
      @itemTap="onSchemeTap"
      class="list-group"
    >
      <v-template>
        <StackLayout class="list-group-item">
          <Label :text="scheme.schemeName" class="scheme-name" textWrap="true" />
          <Label :text="'Scheme Code: ' + scheme.schemeCode" class="scheme-code" />
          <Button text="Compare" @tap="onCompareButtonTap" class="compare-btn" />
        </StackLayout>
      </v-template>
    </ListView>
  </GridLayout>
</template>

<script>
import { api } from '../../api/mutual-fund';
import { SchemeDetailsPage } from './SchemeDetailsPage.vue';

export default {
  props: {
    initialSearch: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchTerm: this.initialSearch,
      schemes: [],
      loading: true
    };
  },
  computed: {
    filteredSchemes() {
      if (!this.searchTerm) return this.schemes;
      const term = this.searchTerm.toLowerCase();
      return this.schemes.filter(scheme => 
        scheme.schemeName.toLowerCase().includes(term) ||
        scheme.schemeCode.toString().includes(term)
      );
    }
  },
  async created() {
    try {
      this.schemes = await api.getAllSchemes();
    } catch (error) {
      console.error('Error fetching schemes:', error);
      // Show error dialog
    } finally {
      this.loading = false;
    }
  },
  methods: {
    onSearchChange() {
      // Update filtered results
    },
    onSchemeTap(event) {
      const scheme = this.filteredSchemes[event.index];
      this.$navigateTo(SchemeDetailsPage, {
        props: { schemeCode: scheme.schemeCode }
      });
    },
    onCompareButtonTap(event) {
      // Add to comparison
    }
  }
};
</script>

<style scoped>
.search-bar {
  margin: 10;
}
.list-group-item {
  padding: 15;
  background-color: white;
  border-bottom-width: 1;
  border-bottom-color: #eee;
}
.scheme-name {
  font-size: 16;
  font-weight: bold;
  margin-bottom: 5;
}
.scheme-code {
  font-size: 14;
  color: #666;
}
.compare-btn {
  margin-top: 10;
  background-color: #007AFF;
  color: white;
  border-radius: 5;
  padding: 5 10;
}
</style>