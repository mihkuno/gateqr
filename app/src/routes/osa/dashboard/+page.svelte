


<script lang="ts">

</script>

<div class="flex justify-center bg-gray-100 min-h-screen px-3 py-6">
    <div class="max-w-xl w-full flex flex-col gap-4">

        <div class="flex justify-between items-center">
            <h1 class="text-sm font-semibold text-gray-600">Dashboard</h1>
            <div>
                <a href="/osa/" class="border px-3 py-1.5 text-xs font-semibold bg-white hover:bg-gray-200 cursor-pointer">
                    Manage Applications
                </a>
                <a href="/osa/departments" class="border px-3 py-1.5 text-xs font-semibold bg-white hover:bg-gray-200 cursor-pointer">
                    Manage Departments
                </a>
            </div>
        </div>


        <div class="flex gap-2">
            <div class="border p-5 w-full flex flex-col">
                <p class="font-medium">Currently In:</p>
                <p class="text-2xl">5</p>
            </div>
    
            <div class="border p-5 w-full flex flex-col">
                <p class="font-medium">Available Slots:</p>
                <p class="text-2xl">5</p>
            </div>

            <div class="border p-5 w-full flex flex-col">
                <p class="font-medium">Visits Today:</p>
                <p class="text-2xl">5</p>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th class="w-1/4 p-2 border">Date</th>
                    <th class="w-1/4 p-2 border">Time</th>
                    <th class="w-1/4 p-2 border">Plate</th>
                    <th class="w-1/4 p-2 border">Bound</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td class="p-2 border">Feb 02 2023</td>
                    <td class="p-2 border">12:00</td>
                    <td class="p-2 border">ABC123</td>
                    <td class="p-2 border">In</td>
                </tr>
                <tr>
                    <td class="p-2 border">Feb 02 2023</td>
                    <td class="p-2 border">12:00</td>
                    <td class="p-2 border">ABC123</td>
                    <td class="p-2 border">Out</td>
                </tr>
            </tbody>
        </table>

    </div>  
</div>