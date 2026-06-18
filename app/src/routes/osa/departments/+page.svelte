<script lang="ts">
    let tab = $state('manage');
    let owner = $state('no');
    let role = $state('employee');
</script>

<div class="flex justify-center bg-gray-100 min-h-screen px-3 py-6 sm:px-4 sm:py-8">
    <div class="max-w-xl w-full flex flex-col gap-4">

        <div class="flex justify-between items-center">
            <h1 class="text-sm font-semibold text-gray-600">Departments</h1>
            <div>
                <a href="/osa/dashboard" class="border px-3 py-1.5 text-xs font-semibold bg-white hover:bg-gray-200 cursor-pointer">
                    View Dashboard
                </a>
                <a href="/osa" class="border px-3 py-1.5 text-xs font-semibold bg-white hover:bg-gray-200 cursor-pointer">
                    Manage Applications
                </a>
            </div>
        </div>

                <!-- Tabs -->
        <!-- <div class="flex gap-2 flex-wrap sm:flex-nowrap">
            <button 
                onclick={() => tab = 'manage'}
                style={tab === 'manage' ? 'background-color: #e5e7eb;' : '#ffffff'}
                class="border p-2 flex-1 min-w-[calc(50%-4px)] sm:min-w-0 bg-white text-sm font-semibold cursor-pointer hover:bg-gray-200">
                Manage
            </button>
            <button 
                onclick={() => tab = 'history'}
                style={tab === 'history' ? 'background-color: #e5e7eb;' : '#ffffff'}
                class="border p-2 flex-1 min-w-[calc(50%-4px)] sm:min-w-0 bg-white text-sm font-semibold cursor-pointer hover:bg-gray-200">
                History
            </button>
        </div> -->

        {#if tab === 'manage'}
            <p class="text-xs">Deleting a department with signed applications immediately terminates their access.</p>
            <button class=" border p-3 text-sm cursor-pointer bg-green-200 hover:bg-green-300">
                New Department
            </button>
        {/if}
        
        <div class="border p-4 flex flex-col gap-4 bg-white">
            
            <!-- Top section: QR + Details -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-2 items-start">

                <!-- Details -->
                <div class="flex items-start justify-between w-full min-w-0">
                    <table class="text-sm sm:ml-4 w-full">
                        <tbody>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">Email:</td>
                                <!-- <td class="pb-1 break-all">joenino.cainday@liceo.edu.ph</td> -->
                                <td class="pb-1 break-all"><input type="text" placeholder="joenino.cainday@liceo.edu.ph" /></td>
                            </tr>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">department:</td>
                                <td class="pb-1 break-all"><input type="text" placeholder="joenino.cainday@liceo.edu.ph" /></td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Status -->
                    <div class="flex flex-col gap-1 shrink-0">
                        <div class="border p-1 font-medium text-[11px] shrink-0">CRD: Feb 06 2023</div>
                        <div class="border p-1 font-medium text-[11px] shrink-0">RVK: Feb 06 2023</div>
                    </div>
                        
                </div>

            </div>

            
            <!-- <label for="schedule" class="text-xs">Reason for revocation</label>
            <p>pangit</p>
            <div class="flex">
                <input type="text" placeholder="what's the reason for revocation" class="w-full border" />
                <button class=" border p-2  cursor-pointer ">
                    Cancel
                </button>
                <button class=" border p-2 cursor-pointer">
                    Continue
                </button>
            </div>
            -->
            
            <!-- Actions -->
                {#if tab === 'manage'}
                <div class="flex gap-2">
                        <!-- <button class="flex-1 border p-3 text-sm cursor-pointer bg-red-200 hover:bg-red-300">
                            Cancel
                        </button> -->
                        <!-- <button class="flex-1 border p-3 text-sm cursor-pointer bg-green-200 hover:bg-green-300">
                            Done
                        </button> -->
                        <button class="flex-1 border p-3 text-sm cursor-pointer bg-orange-200 hover:bg-orange-300">
                            Delete
                        </button>
                        <button class="flex-1 border p-3 text-sm cursor-pointer bg-orange-200 hover:bg-orange-300">
                            Edit
                        </button>
                    </div>
                {/if}
            </div>
            

    </div>
</div>