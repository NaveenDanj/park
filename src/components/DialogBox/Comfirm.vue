<template>
    <v-dialog v-model="show" @keydown.esc="handleOK" @keydown.enter="handleOK" persistent max-width="350">
        
        <v-card>

            <v-toolbar
                flat
                color="warning"
            >
                <v-icon class="white--text">mdi-information-outline </v-icon>
                <v-toolbar-title class="font-weight-light white--text ml-3 headline">
                    Warning
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text class="mt-5" style="font-size : 19px;">Are You Sure You want to remove this access data?</v-card-text>
            <v-card-actions>
                <v-btn color="green darken-1" text @click="handleNO">NO</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="handleYES">YES</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name : 'AlertBox',
    props: ['show'],

    methods : {
        handleNO(){
            this.$emit('results' , false);
        },

        handleYES(){
            this.$emit('results' , true);
        }
    }

}
</script>

<style>

</style>